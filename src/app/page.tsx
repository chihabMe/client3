import React from "react";

import Hero from "@/components/sections/Hero";
import ContentShowcase from "@/components/sections/ContentShowcase";
import Pricing from "@/components/sections/Pricing";
import SocialProof from "@/components/sections/SocialProof";
import HowItWorks from "@/components/sections/HowItWorks";
import Compatibility from "@/components/sections/Compatibility";
import FAQ from "@/components/sections/FAQ";
import KeyStats from "./_components/KeyStats";
import FeaturedContent from "./_components/FeaturedContent";

import { featuredContent } from "@/data/contents"
import WhyChooseUs from "./_components/whyChooseus";

const Index = () => {
  return (
    <div className="min-h-screen  text-white overflow-x-hidden">
      <main>
        <Hero />
        <KeyStats />
        <WhyChooseUs />
        <FeaturedContent
          title="Featured Content"
          description="Explore our handpicked selection of premium content available in your subscription"
          contents={featuredContent}
          viewAllLink="/channels"
        />
        <ContentShowcase />
        <HowItWorks />
        <Pricing />
        <SocialProof />
        {/* <ProviderSelection /> */}
        <Compatibility />
        <FAQ />
      </main>
    </div>
  );
};

export default Index;
