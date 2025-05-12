"use client";
import { ReactNode } from "react";
import { LazyMotion, domAnimation } from "motion/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
};

export default Providers;
