"use client";

import { useAnimation } from "motion/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true, // Only trigger animation once
    rootMargin: "0px 0px -100px 0px",
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return { ref, controls, inView };
};
