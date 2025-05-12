"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motions";
import { useScrollAnimation } from "@/hook/use-scroll-animation";

const HowItWorks = () => {
  const { ref, controls } = useScrollAnimation(0.2);
  
  const steps = [
    {
      id: 1,
      title: "Choose Your Plan",
      description: "Select the subscription that suits your needs and budget.",
      icon: (
        <svg className="w-8 h-8 text-[#39ff14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Download & Install",
      description: "Download our app on your preferred device and sign in.",
      icon: (
        <svg className="w-8 h-8 text-[#39ff14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Start Streaming",
      description: "Enjoy unlimited access to thousands of movies, shows, and live channels.",
      icon: (
        <svg className="w-8 h-8 text-[#39ff14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black/40 to-black/50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={fadeIn}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            How It Works
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get started with IPTV King in just three simple steps and transform your entertainment experience today.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={fadeIn}
              className="flex flex-col items-center text-center"
            >
              <motion.div 
                className="w-16 h-16 rounded-full flex items-center justify-center bg-white/5 border border-[#39ff14]/30 mb-6"
                whileInView={{ 
                  boxShadow: ['0 0 0px rgba(57, 255, 20, 0)', '0 0 20px rgba(57, 255, 20, 0.6)', '0 0 0px rgba(57, 255, 20, 0)'],
                  transition: { 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                <span className="text-2xl font-bold text-[#39ff14]">{step.id}</span>
              </motion.div>
              <div className="mt-2 mb-3">{step.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
