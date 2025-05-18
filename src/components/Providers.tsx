"use client";
import { ReactNode } from "react";
import { LazyMotion, domAnimation } from "motion/react";
import { Toaster } from "@/components/ui/toaster";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>
      {children}

      <Toaster />
    </LazyMotion>
  );
};

export default Providers;
