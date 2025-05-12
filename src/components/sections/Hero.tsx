"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Fixed import to use framer-motion
import Image from "next/image";

const Hero = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16"
    >
      {/* Background with Next.js Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80"
            alt="Hero background"
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Animated particles/stars effect */}
      <motion.div
        className="absolute inset-0 z-0 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            variants={fadeIn}
          >
            Cut the clutter
            <motion.span variants={fadeIn} className="block mt-2">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                className="h-[3px] bg-[#39ff14] mb-2 mx-auto"
              />
              One subscription, endless entertainment.
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-10"
            variants={fadeIn}
          >
            Explore the world's finest collection of films, series, TV channels,
            and sports events all in one place, available on any device, anytime
            you want.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
              animate={{
                boxShadow: [
                  "0px 0px 0px rgba(57, 255, 20, 0)",
                  "0px 0px 20px rgba(57, 255, 20, 0.7)",
                  "0px 0px 0px rgba(57, 255, 20, 0)",
                ],
              }}
              transition={{
                boxShadow: {
                  repeat: Infinity,
                  duration: 2,
                },
              }}
            >
              <Button
                className="bg-[#39ff14] text-black hover:bg-[#39ff14]/90 text-lg font-medium w-full px-8 py-6 rounded-lg"
                size="lg"
              >
                Join Now
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg font-medium w-full px-8 py-6 rounded-lg"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
