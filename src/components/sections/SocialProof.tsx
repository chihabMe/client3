"use client";

import * as motion from "motion/react-m";
import { AnimatePresence } from "motion/react";
import React, { useEffect, useRef } from "react";
import { fadeIn } from "@/lib/motions";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hook/use-scroll-animation";
import Image from "next/image";

const chatMessages = [
  {
    id: 1,
    name: "Sarah J.",
    message:
      "Je viens de passer à IPTV King et je suis émerveillée par la qualité ! Les flux 4K fonctionnent parfaitement sur ma smart TV.",
    time: "il y a 2 jours",
    color: "bg-blue-500",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 2,
    name: "Michael T.",
    message:
      "Je n'arrive pas à croire que je peux regarder tous mes sports préférés au même endroit ! Premier League, NBA et F1 tous inclus !",
    time: "il y a 1 semaine",
    color: "bg-green-500",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Elena R.",
    message:
      "Le service client m'a aidé à m'installer en quelques minutes. Fonctionne très bien sur tous mes appareils. Ça vaut vraiment le prix !",
    time: "il y a 3 jours",
    color: "bg-purple-500",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 4,
    name: "Robert K.",
    message:
      "Après avoir essayé 3 autres services, IPTV King est de loin le meilleur. Zéro mise en mémoire tampon pendant les grandes soirées de match !",
    time: "il y a 5 jours",
    color: "bg-orange-500",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 5,
    name: "Jessica M.",
    message:
      "Mes enfants adorent les chaînes de dessins animés et j'adore la sélection de films. Une solution familiale parfaite !",
    time: "il y a 1 jour",
    color: "bg-pink-500",
    avatar: "https://i.pravatar.cc/150?img=23",
  },
];

const SocialProof = () => {
  const { ref, controls } = useScrollAnimation(0.2);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Auto rotate through reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % chatMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={fadeIn}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#0055A4] to-[#00bfff]">
            Ce Que Disent Nos Clients
          </h2>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Rejoignez plus de 150 000 abonnés satisfaits qui ont transformé leur
            expérience de divertissement.
          </p>
        </motion.div>

        <div
          className="relative overflow-hidden max-w-5xl mx-auto"
          ref={reviewsContainerRef}
        >
          <div className="flex justify-center max-w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 w-full"
              >
                {[chatMessages[activeIndex]].map((message) => (
                  <motion.div
                    key={message.id}
                    className="w-full max-w-md"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 15px rgba(57, 255, 20, 0.3)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    <motion.div
                      initial={{ rotateY: 0 }}
                      animate={{
                        rotateY: [0, -5, 5, 0],
                        transition: {
                          duration: 2,
                          ease: "easeInOut",
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 2,
                        },
                      }}
                      className="preserve-3d"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <Card className="bg-gradient-to-br from-[#121C24] to-[#1A2730] backdrop-blur-sm border border-white/10 p-4 rounded-2xl shadow-xl overflow-hidden relative min-h-[400px]">
                        {/* WhatsApp-style header */}
                        <div className="bg-[#1F2C34] absolute top-0 left-0 right-0 px-6 py-3 flex items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <Image
                                width={320}
                                height={180}
                                src={message.avatar || "/placeholder.svg"}
                                alt={message.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-white font-medium text-sm">
                                {message.name}
                              </h4>
                              <p className="text-gray-300 text-xs">en ligne</p>
                            </div>
                          </div>
                          <div className="flex gap-4 ml-auto">
                            <div className="h-4 w-4 rounded-full bg-gray-400 opacity-60"></div>
                            <div className="h-4 w-4 rounded-full bg-gray-400 opacity-60"></div>
                          </div>
                        </div>

                        <div className="mt-16 pt-2">
                          {/* Date separator */}
                          <div className="flex justify-center my-4">
                            <span className="bg-[#182229] text-gray-300 text-xs px-3 py-1 rounded-lg">
                              {message.time}
                            </span>
                          </div>

                          {/* Message bubble */}
                          <motion.div
                            className="ml-4 mt-6 bg-[#128C7E] p-4 rounded-lg rounded-tl-none relative max-w-[320px]"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <p className="text-white text-base">
                              {message.message}
                            </p>
                            <span className="text-gray-200 text-xs flex justify-end items-center gap-1 mt-2">
                              12:45 PM
                              <svg
                                className="w-4 h-4 fill-gray-200"
                                viewBox="0 0 16 15"
                              >
                                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512z" />
                              </svg>
                            </span>

                            {/* Triangle for chat bubble */}
                            <div className="absolute left-[-8px] top-0 w-0 h-0 border-t-[8px] border-r-[8px] border-b-0 border-l-0 border-solid border-t-[#128C7E] border-r-[#128C7E] border-b-transparent border-l-transparent"></div>
                          </motion.div>

                          {/* Additional message */}
                          <motion.div
                            className="ml-4 mt-3 bg-[#128C7E] p-4 rounded-lg rounded-tl-none relative max-w-[300px]"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                          >
                            <p className="text-white text-base">
                              Je le recommanderais certainement à mes amis et à
                              ma famille ! 👍
                            </p>
                            <span className="text-gray-200 text-xs flex justify-end items-center gap-1 mt-2">
                              12:46 PM
                              <svg
                                className="w-4 h-4 fill-gray-200"
                                viewBox="0 0 16 15"
                              >
                                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512z" />
                              </svg>
                            </span>

                            <div className="absolute left-[-8px] top-0 w-0 h-0 border-t-[8px] border-r-[8px] border-b-0 border-l-0 border-solid border-t-[#128C7E] border-r-[#128C7E] border-b-transparent border-l-transparent"></div>
                          </motion.div>

                          {/* User rating */}
                          <div className="flex justify-center mt-12">
                            <div className="bg-[#182229] rounded-xl p-3 inline-flex flex-col items-center">
                              <div className="text-white text-sm font-medium mb-1">
                                Évaluation Client
                              </div>
                              <div className="flex mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <motion.svg
                                    key={i}
                                    className="w-5 h-5 fill-[#0055A4]"
                                    viewBox="0 0 20 20"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                  >
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                  </motion.svg>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 gap-2">
            {chatMessages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index ? "bg-[#0055A4] w-6" : "bg-gray-400/50"
                }`}
                aria-label={`Aller à l'avis ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
