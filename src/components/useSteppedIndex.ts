"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Follows a target index one step at a time, so a fast scroll that jumps 0 -> 2
// still shows step 1 briefly instead of skipping it.
export function useSteppedIndex(dwellMs = 380) {
  const [index, setIndex] = useState(0);
  const target = useRef(0);
  const current = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tick = useCallback(() => {
    timer.current = null;
    if (current.current === target.current) return;
    current.current += current.current < target.current ? 1 : -1;
    setIndex(current.current);
    if (current.current !== target.current) {
      timer.current = setTimeout(tick, dwellMs);
    }
  }, [dwellMs]);

  const setTarget = useCallback(
    (next: number) => {
      target.current = next;
      if (timer.current === null) tick();
    },
    [tick],
  );

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return [index, setTarget] as const;
}
