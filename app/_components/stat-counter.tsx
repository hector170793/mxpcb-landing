"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1500;
const INTERSECTION_THRESHOLD = 0.35;

function formatValue(value: number) {
  return Math.round(value).toLocaleString("es-MX");
}

type StatCounterProps = {
  value: number;
};

export function StatCounter({ value }: StatCounterProps) {
  // Fail-safe: SSR/initial state is always the final value. Only an armed
  // IntersectionObserver (JS enabled, IO supported, motion not reduced) may
  // reset it to 0 before animating back up.
  const [display, setDisplay] = useState(() => formatValue(value));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setDisplay(formatValue(0));

        const started = performance.now();
        function tick(now: number) {
          const progress = Math.min(1, (now - started) / DURATION_MS);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(formatValue(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: INTERSECTION_THRESHOLD },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}
