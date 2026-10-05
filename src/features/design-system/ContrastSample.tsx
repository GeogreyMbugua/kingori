"use client";

import { useCallback, useState } from "react";
import { contrastRatio, parseColor, toHex } from "@/lib/color";
import styles from "./DesignSystem.module.css";

interface ContrastSampleProps {
  /** Semantic colour token name without the --color- prefix, e.g. "accent-text". */
  readonly foreground: string;
  readonly background: string;
}

interface Measurement {
  readonly foreground: string;
  readonly background: string;
  readonly ratio: number;
}

function grade(ratio: number): string {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA large / UI";
  return "Fail";
}

/**
 * Measures the colours the browser actually resolved, so the readout stays
 * truthful inside any data-surface scope.
 */
export function ContrastSample({ foreground, background }: ContrastSampleProps) {
  const [measurement, setMeasurement] = useState<Measurement | null>(null);

  const measure = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const computed = getComputedStyle(node);
    const fg = parseColor(computed.color);
    const bg = parseColor(computed.backgroundColor);
    setMeasurement({ foreground: toHex(fg), background: toHex(bg), ratio: contrastRatio(fg, bg) });
  }, []);

  return (
    <div
      ref={measure}
      className={styles.contrastSample}
      style={{
        color: `var(--color-${foreground})`,
        backgroundColor: `var(--color-${background})`,
      }}
    >
      <span className={styles.contrastText}>Aa</span>
      <span data-type="meta" className={styles.contrastMeta}>
        {foreground} on {background}
        <br />
        {measurement
          ? `${measurement.foreground} / ${measurement.background} · ${measurement.ratio.toFixed(2)}:1 · ${grade(measurement.ratio)}`
          : "Measuring…"}
      </span>
    </div>
  );
}
