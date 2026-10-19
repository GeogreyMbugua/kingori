"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./AboutImageTrail.module.css";

type Photograph = { src: string; alt?: string };
type Props = { images: readonly Photograph[]; children: ReactNode };

export function AboutImageTrail({ images, children }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const ambient = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    const surface = layer.current;
    if (!host || !surface || typeof window.matchMedia !== "function") return;
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const sources = images.filter((image) => image.src);
    let index = 0;
    let previous: { x: number; y: number } | null = null;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (callback: () => void, delay: number) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
    };
    const clear = () => {
      previous = null;
      timers.forEach(clearTimeout);
      timers.clear();
      surface.replaceChildren();
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse" || !sources.length) return;
      const rect = host.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (previous && Math.hypot(x - previous.x, y - previous.y) < 70) return;
      previous = { x, y };
      const source = sources[index % sources.length];
      if (!source) return;
      const rotation = index++ % 2 ? -7 : 7;
      const card = document.createElement("div");
      card.className = styles.card ?? "";
      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
      card.style.setProperty("--trail-rotation", `${rotation}deg`);
      const image = document.createElement("img");
      image.src = source.src;
      image.alt = "";
      image.draggable = false;
      image.decoding = "async";
      card.appendChild(image);
      surface.appendChild(card);
      while (surface.childElementCount > 12) surface.firstElementChild?.remove();
      later(() => card.remove(), 1400);
    };
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", clear);
    media.addEventListener("change", clear);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", clear);
      media.removeEventListener("change", clear);
      clear();
    };
  }, [images]);

  useEffect(() => {
    const host = root.current;
    const surface = ambient.current;
    if (!host || !surface || typeof window.matchMedia !== "function") return;
    if (typeof IntersectionObserver !== "function") return;
    const mobile = window.matchMedia("(hover: none), (pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sources = images.filter((image) => image.src);
    if (!sources.length) return;
    let visible = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    let index = 0;
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const show = (still = false) => {
      const source = sources[index % sources.length];
      if (!source) return;
      index += 1;
      const image = document.createElement("img");
      image.src = source.src;
      image.alt = "";
      image.draggable = false;
      image.decoding = "async";
      image.className = (still ? styles.ambientStill : styles.ambientPhoto) ?? "";
      surface.replaceChildren(image);
    };
    const sync = () => {
      stop();
      if (!mobile.matches) {
        surface.replaceChildren();
        return;
      }
      if (reduced.matches) {
        show(true);
        return;
      }
      if (!visible || document.hidden) return;
      show();
      timer = setInterval(() => show(), 5000);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      sync();
    }, { threshold: 0.1 });
    observer.observe(host);
    mobile.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      observer.disconnect();
      mobile.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      surface.replaceChildren();
    };
  }, [images]);

  return (
    <div ref={root} className={styles.root}>
      <div ref={layer} className={styles.trail} aria-hidden="true" />
      <div ref={ambient} className={styles.ambient} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
