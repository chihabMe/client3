"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

const sportImages = [
  { src: "/sport_events/sport4.webp", alt: "Premier League football players" },
  { src: "/sport_events/sport1.webp", alt: "Football players from various leagues" },
  { src: "/sport_events/sport5.webp", alt: "Champions League football players" },
  { src: "/sport_events/sports12.webp", alt: "Sadui league" },
  { src: "/sport_events/sport3.webp", alt: "Serie A football players", badge: "SERIE A" },
  { src: "/sport_events/sport6.webp", alt: "Sport image 6" },
  { src: "/sport_events/sport7.webp", alt: "Sport image 7" },
  { src: "/sport_events/sport8.webp", alt: "Sport image 8" },
  { src: "/sport_events/sport9.webp", alt: "Sport image 9" },
  { src: "/sport_events/sport10.webp", alt: "Sport image 10" },
  { src: "/sport_events/sport11.webp", alt: "Sport image 11" },
];

export default function SportEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Auto-scroll for 5 seconds when section enters view
  useEffect(() => {
    if (!inView || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollSpeed = 10; // pixels per frame (~60fps => ~60px/sec)
    let frameId: number;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < 5000) {
        container.scrollLeft += scrollSpeed;
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, [inView]);

  // Manual navigation
  const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -350, behavior: "smooth" });
  const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 350, behavior: "smooth" });

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 px-4 relative">
      <div className="mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
          Suivez vos sports préférés et les plus grandes ligues en direct
        </h1>
        <div className="text-gray-900 py-2 px-4 rounded-md inline-block mb-10">
          <p className="text-sm md:text-base">
            Toute laction des grandes ligues sportives — en un seul abonnement IPTV.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 ring-2 ring-green-400 bg-green-500/80 rounded-full p-2 shadow-lg hover:bg-green-500 hidden md:block"
            aria-label="Scroll left"
          >
            <ChevronLeft size={30} className="text-white" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 ring-2 ring-green-400 bg-green-500/80 rounded-full p-2 shadow-lg hover:bg-green-500 hidden md:block"
            aria-label="Scroll right"
          >
            <ChevronRight size={30} className="text-white" />
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scroll-smooth flex gap-6 pb-6 hide-scrollbar"
          >
            {sportImages.map((item, idx) => (
              <div
                key={idx}
                className="min-w-[300px] md:min-w-[400px]"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg h-[450px] md:h-[550px]">
                  <Image
                    src={item.src}

                    alt={item.alt ?? `image ${item.badge} `}
                    quality={80}
                    width={400}
                    height={550}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  {item.badge && (
                    <div className="absolute bottom-4 right-4 bg-white/80 px-2 py-1 rounded text-sm font-bold">
                      {item.badge}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
