import React from "react";

import Hero from "@/components/sections/Hero";
import ContentShowcase from "@/components/sections/ContentShowcase";
import SocialProof from "@/components/sections/SocialProof";
import HowItWorks from "@/components/sections/HowItWorks";
import Compatibility from "@/components/sections/Compatibility";
import FAQ from "@/components/sections/FAQ";
import KeyStats from "./_components/KeyStats";
import WhyChooseUs from "./_components/whyChooseus";
import PricingSection from "@/components/sections/pricing/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen  text-white overflow-x-hidden">
      <main>
        <Hero />
        <ContentShowcase />
        {/* <Pricing /> */}
        <PricingSection />
        <KeyStats />
        <WhyChooseUs />
        <HowItWorks />
        <SocialProof />
        <Compatibility />
        <FAQ />
      </main>
    </div>
  );
};

export default Index;
