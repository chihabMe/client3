"use client";
import { ReactNode } from "react";
import { LazyMotion, domAnimation } from "motion/react";
import { Toaster } from "@/components/ui/toaster";
import { PostHogProvider } from "./PosthogProvider"


const Providers = ({ children }: { children: ReactNode }) => {

  return (
    <LazyMotion features={domAnimation}>
      <PostHogProvider>
        {children}
      </PostHogProvider>
      <Toaster />
    </LazyMotion>
  );
};

export default Providers;
