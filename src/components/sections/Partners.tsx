"use client";

import React from "react";
import * as motion from "motion/react-m";
import { staggerContainer, fadeInRight } from "@/lib/motions";
import partnersData from "@/data/partners.json";
import { useScrollAnimation } from "@/hook/use-scroll-animation";
import Image from "next/image";

const Partners = () => {
  const { ref, controls } = useScrollAnimation(0.2);

  return (
    <section className="py-16 bg-black/40">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="text-center mb-10"
        >
          <h3 className="text-xl text-gray-300 mb-10">
            Trusted by the worlds leading networks
          </h3>

          <motion.div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partnersData.logos.map((partner, index) => (
              <motion.div
                key={partner.id}
                whileHover="hover"
                whileTap="tap"
                custom={index}
                variants={{
                  ...fadeInRight,
                  hidden: {
                    opacity: 0,
                    x: -20,
                    rotateY: -30,
                  },
                  visible: (i) => ({
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    transition: {
                      type: "spring",
                      damping: 12,
                      stiffness: 100,
                      delay: i * 0.1,
                    },
                  }),
                  hover: {
                    scale: 1.1,
                    rotate: [0, -2, 2, -2, 0],
                    transition: {
                      rotate: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.6,
                      },
                    },
                  },
                  tap: {
                    scale: 0.95,
                    transition: { duration: 0.1 },
                  },
                }}
                className="bg-white/5 p-3 rounded-2xl glass-card"
              >
                <div className="w-24 h-12 relative">
                  <Image
                    fill
                    src={partner.imageUrl}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
