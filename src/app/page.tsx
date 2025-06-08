import React from "react";

import Hero from "@/components/sections/Hero";
import ContentShowcase from "@/components/sections/ContentShowcase";
//import SocialProof from "@/components/sections/SocialProof";
import HowItWorks from "@/components/sections/HowItWorks";
import Compatibility from "@/components/sections/Compatibility";
import FAQ from "@/components/sections/FAQ";
import KeyStats from "./_components/KeyStats";
import WhyChooseUs from "./_components/whyChooseus";
import PricingSection from "@/components/sections/pricing/PricingSection";
import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";


export const metadata: Metadata = {
  description: "Media4IPTV vous offre un accès rapide et fiable à des milliers de chaînes TV, films, séries et sports en direct via IPTV. Compatible avec tous les appareils. Support 24h/24.",
  title: "media4iptv"
}


const Index = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen  text-white overflow-x-hidden">
        <main>
          <Hero />
          <ContentShowcase />
          {/* <Pricing /> */}
          <PricingSection />
          <KeyStats />
          <WhyChooseUs />
          <HowItWorks />
          <Compatibility />
          <FAQ />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Index;
