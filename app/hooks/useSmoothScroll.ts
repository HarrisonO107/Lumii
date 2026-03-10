"use client";

import { useCallback } from "react";

export function useSmoothScroll(offset = 80) {
  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [offset]
  );
}