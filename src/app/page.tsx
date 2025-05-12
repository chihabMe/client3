
import React from 'react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Partners from '@/components/sections/Partners';
import ContentShowcase from '@/components/sections/ContentShowcase';
import Pricing from '@/components/sections/Pricing';
import SocialProof from '@/components/sections/SocialProof';
import HowItWorks from '@/components/sections/HowItWorks';
import ProviderSelection from '@/components/sections/ProviderSelection';
import Compatibility from '@/components/sections/Compatibility';
import FAQ from '@/components/sections/FAQ';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Partners />
        <ContentShowcase />
        <HowItWorks />
        <Pricing />
        <SocialProof />
        <ProviderSelection />
        <Compatibility />
        <FAQ />
      </main>
    </div>
  );
};

export default Index;
