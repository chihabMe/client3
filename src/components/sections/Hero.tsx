"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-m";
import { fadeIn } from "@/lib/motions";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16"
    >
      {/* Background video/image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80')",
          }}
        />
      </div>

      {/* Animated particles/stars effect */}
      <motion.div
        className="absolute inset-0 z-0 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {[...Array(15)].map((_, i) => (
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
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-gradient"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cut the clutter
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="block"
            >
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                className="inline-block h-[3px] bg-[#39ff14] mb-2"
              />
              One subscription, endless entertainment.
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-10"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Explore the worlds finest collection of films, series, TV channels,
            and sports events all in one place, available on any device, anytime
            you want.
          </motion.p>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
                className="bg-[#39ff14] text-black hover:bg-[#39ff14]/90 text-lg py-6 px-8 rounded-2xl"
                size="lg"
              >
                Join Now
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 hover:bg-white/10 text-white text-lg py-6 px-8 rounded-2xl"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
