'use client';

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motions";
import { useScrollAnimation } from "@/hook/use-scroll-animation";

const Compatibility = () => {
  const { ref, controls } = useScrollAnimation(0.2);
  
  const devices = [
    { id: 1, name: "Android TV", icon: "📱" },
    { id: 2, name: "iPhone & iPad", icon: "📱" },
    { id: 3, name: "Amazon Fire TV", icon: "📺" },
    { id: 4, name: "Samsung Smart TV", icon: "📺" },
    { id: 5, name: "LG WebOS", icon: "📺" },
    { id: 6, name: "Android Phones & Tablets", icon: "📱" },
    { id: 7, name: "Windows PC", icon: "💻" },
    { id: 8, name: "Mac", icon: "💻" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black/60 to-black/70">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={fadeIn}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Available On All Your Devices
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Enjoy seamless streaming on all your favorite devices with our cross-platform compatibility.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {devices.map((device, index) => (
            <motion.div
              key={device.id}
              variants={fadeIn}
              custom={index}
              whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3 } }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white/10 glass-card text-3xl mb-4">
                {device.icon}
              </div>
              <h3 className="text-white font-medium text-lg">{device.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Compatibility;
