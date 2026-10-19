"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type PointerEvent, type TransitionEvent } from "react";
import styles from "./MobilePhotoStack.module.css";

type Photograph = { src: string; alt?: string; width: number; height: number };
type Gesture = { x: number; phase: "drag" | "settle" | "leave" };

const LOCK = 8;

export function MobilePhotoStack({ images }: { images: readonly Photograph[] }) {
  const photos = images.filter((image) => image.src);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [gesture, setGesture] = useState<Gesture | null>(null);
  const start = useRef<{ x: number; y: number; id: number; horizontal: boolean | null } | null>(null);
  const leave = useRef(0);

  if (!photos.length) return null;

  const current = index % photos.length;
  const change = (step: number) => {
    setDirection(step);
    setIndex((value) => (value + step + photos.length) % photos.length);
  };
  const down = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || photos.length < 2 || gesture?.phase === "leave") return;
    start.current = { x: event.clientX, y: event.clientY, id: event.pointerId, horizontal: null };
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const first = start.current;
    if (!first || first.id !== event.pointerId) return;
    const dx = event.clientX - first.x;
    const dy = event.clientY - first.y;
    if (first.horizontal === null) {
      if (Math.hypot(dx, dy) < LOCK) return;
      first.horizontal = Math.abs(dx) > Math.abs(dy);
      if (!first.horizontal) {
        start.current = null;
        return;
      }
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        /* Pointer capture is unavailable in some test renderers. */
      }
    }
    if (!first.horizontal) return;
    setGesture({ x: dx, phase: "drag" });
  };
  const finish = (event: PointerEvent<HTMLDivElement>) => {
    const first = start.current;
    start.current = null;
    if (!first || first.id !== event.pointerId || !first.horizontal) return;
    const dx = event.clientX - first.x;
    const width = event.currentTarget.getBoundingClientRect().width || 280;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (Math.abs(dx) < Math.min(72, width * 0.22)) {
      setGesture({ x: 0, phase: "settle" });
      return;
    }
    const step = dx < 0 ? 1 : -1;
    if (reduced) {
      setGesture(null);
      change(step);
      return;
    }
    leave.current = step;
    setGesture({ x: Math.sign(dx) * width * 1.2, phase: "leave" });
  };
  const settled = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "transform" || event.target !== event.currentTarget) return;
    const step = leave.current;
    leave.current = 0;
    setGesture(null);
    if (step) change(step);
  };

  const swiping = gesture !== null;

  return (
    <section className={styles.root} aria-label="Photographs of me" aria-roledescription="carousel">
      <div
        className={styles.stage}
        style={
          {
            "--swipe-x": `${gesture?.x ?? 0}px`,
            "--swipe-turn": `${(gesture?.x ?? 0) / 28}deg`,
          } as CSSProperties
        }
        data-swiping={swiping || undefined}
        data-dragging={gesture?.phase === "drag" || undefined}
        tabIndex={0}
        aria-keyshortcuts="ArrowLeft ArrowRight"
        aria-label="Photograph stack. Swipe sideways, or use the left and right arrow keys."
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={finish}
        onPointerCancel={finish}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            change(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            change(-1);
          }
        }}
      >
        {[2, 1, 0].slice(3 - Math.min(3, photos.length)).map((depth) => {
          const photo = photos[(current + depth) % photos.length];
          if (!photo) return null;
          return (
            <div
              key={depth === 0 ? `front-${current}` : `back-${depth}`}
              className={styles.card}
              data-depth={depth}
              data-direction={direction}
              aria-hidden={depth !== 0 || undefined}
              onTransitionEnd={depth === 0 ? settled : undefined}
            >
              <Image
                src={photo.src}
                alt={depth === 0 ? photo.alt || `Personal photograph ${current + 1}` : ""}
                fill
                sizes="78vw"
                className={styles.photo}
                draggable={false}
                priority={depth === 0}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.controls}>
        <p className={styles.hint} data-type="body-sm">
          A few sides of me
        </p>
        <p className={styles.count} data-type="meta" aria-live="polite" aria-atomic="true">
          {String(current + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
