"use client";
import React, { useEffect, useRef } from "react";
import * as motion from "motion/react-m"
import partnersData from "@/data/partners.json";
import Image from "next/image";
import { useAnimationControls, useInView } from "motion/react";


const Partners = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Marquee animation with two duplicate sets for seamless looping
  const marqueeVariants = {
    animate: {
      x: [0, -2000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 60,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="py-1   overflow-hidden relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
          className="text-center  md:mb-16"
        >

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-gray-700/0 via-gray-400 to-gray-700/0 mx-auto mb-16"
            variants={{
              hidden: { width: 0 },
              visible: {
                width: "6rem",
                transition: {
                  duration: 0.8,
                  delay: 0.3
                }
              }
            }}
          />

          {/* First row - visible partners with individual animations */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:gap-12"
          >
            {partnersData.logos.slice(0, 6).map((partner, index) => (
              <motion.div
                key={partner.id}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 20,
                    scale: 0.8,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      damping: 12,
                      stiffness: 100,
                      delay: index * 0.08,
                    },
                  },
                }}
                className=" md:p-5  rounded-2xl bg-white p-1 border-white/10  transition-all duration-300 "
              >
                <div className="w-16 md:w-40 h-20   relative">
                  <Image
                    fill
                    src={partner.imageUrl}
                    alt={partner.name}
                    className="w-full h-full object-contain transition-all duration-300 filter  "
                    sizes="(max-width: 768px) 100vw, 112px"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Second row - marquee animation for additional partners */}
          <div className="relative w-full overflow-hidden py-4">
            <div className="flex overflow-hidden relative w-full">
              <motion.div
                className="flex space-x-12 absolute whitespace-nowrap"
                variants={marqueeVariants}
                animate="animate"
                style={{ width: "fit-content" }}
              >
                {/* Duplicate logos for seamless loop */}
                {[...partnersData.logos, ...partnersData.logos, ...partnersData.logos].map((partner, index) => (
                  <div
                    key={`marquee-${partner.id}-${index}`}
                    className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm inline-block"
                  >
                    <div className="w-24 h-12 relative">
                      <Image
                        fill
                        src={partner.imageUrl}
                        alt={partner.name}
                        className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, 96px"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Radial gradient background accent - now properly positioned */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-[#00ff2a]/5 blur-3xl rounded-full pointer-events-none z-0"></div>
    </section>
  );
};

export default Partners;
