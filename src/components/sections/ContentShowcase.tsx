"use client";

import React, { useRef, useEffect } from "react";
import * as motion from "motion/react-m";
import { Card, CardContent } from "@/components/ui/card";
import { fadeIn, cardHover, staggerContainer } from "@/lib/motions";
import showsData from "@/data/shows.json";
import { useScrollAnimation } from "@/hook/use-scroll-animation";
import Image from "next/image";

const ContentShowcase = () => {
  const { ref, controls } = useScrollAnimation(0.2);
  const moviesScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;
    let scrollPosition = 0;
    const maxScroll = 2000;
    const scrollSpeed = 0.5;

    const scrollCarousel = () => {
      if (moviesScrollRef.current) {
        scrollPosition = (scrollPosition + scrollSpeed) % maxScroll;
        moviesScrollRef.current.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scrollCarousel);
    };

    const timeoutId = setTimeout(() => {
      scrollCarousel();
    }, 2000);

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      scrollCarousel();
    };

    const carousel = moviesScrollRef.current;
    if (carousel) {
      carousel.addEventListener("mouseenter", handleMouseEnter);
      carousel.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationId);
      if (carousel) {
        carousel.removeEventListener("mouseenter", handleMouseEnter);
        carousel.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-black/60 to-black/40"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          variants={fadeIn}
          initial="hidden"
          animate={controls}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Contenu en vedette
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explorez notre vaste collection de films, séries TV et contenus exclusifs.
            Le tout disponible en qualité exceptionnelle sur tous vos appareils.
          </p>
        </motion.div>

        {/* Carrousel de films */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="mt-16"
        >
          <h3 className="text-xl font-semibold mb-6 px-4 text-white">
            Films & Séries Populaires
          </h3>
          <div
            ref={moviesScrollRef}
            className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-none gap-4 pb-8 px-2 md:px-4 scroll-smooth"
          >
            {showsData.featured.map((show) => (
              <motion.div
                key={show.id}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                whileHover="hover"
                className="snap-start flex-shrink-0 w-64 md:w-80"
              >
                <motion.div variants={cardHover}>
                  <Card className="overflow-hidden rounded-2xl border-0 shadow-lg bg-transparent h-[350px] md:h-[400px] card-hover [#39ff14]-glow-hover">
                    <CardContent className="p-0 h-full relative">
                      <Image
                        width={320}
                        height={180}
                        src={show.image}
                        alt={show.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-bold text-xl">
                            {show.title}
                          </h4>
                          <span className="text-[#39ff14] font-semibold">
                            {show.rating}★
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mt-1">
                          {show.category}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contenu sportif */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="mt-16"
        >
          <h3 className="text-xl font-semibold mb-6 px-4 text-white">
            Sports & Événements en direct
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
            {showsData.sports.map((sport, index) => (
              <motion.div
                key={sport.id}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  scale: 1.05,
                  rotate: index % 2 === 0 ? 2 : -2,
                  transition: { duration: 0.3 },
                }}
                className="overflow-hidden rounded-2xl aspect-video"
              >
                <Card className="overflow-hidden rounded-2xl border-0 shadow-lg bg-transparent h-full [#39ff14]-glow-hover">
                  <CardContent className="p-0 h-full relative">
                    <Image
                      width={320}
                      height={180}
                      src={sport.image}
                      alt={sport.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                      <h4 className="text-white font-bold text-xl">
                        {sport.title}
                      </h4>
                      <p className="text-[#39ff14] text-sm">{sport.category}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContentShowcase;
