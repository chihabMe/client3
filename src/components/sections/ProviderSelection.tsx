"use client";

import React, { useState } from "react";
import * as motion from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { fadeIn, cardFlip } from "@/lib/motions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useScrollAnimation } from "@/hook/use-scroll-animation";

const ProviderSelection = () => {
  const { ref, controls } = useScrollAnimation(0.2);
  const [flipped, setFlipped] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("us");

  const providers = {
    us: {
      name: "United States",
      flag: "🇺🇸",
      description:
        "Access to 500+ US channels including sports networks, premium movie channels, and local networks.",
    },
    uk: {
      name: "United Kingdom",
      flag: "🇬🇧",
      description:
        "Watch BBC, ITV, Channel 4 and all major UK networks plus exclusive sports coverage.",
    },
    ca: {
      name: "Canada",
      flag: "🇨🇦",
      description:
        "Stream CBC, CTV, TSN and other Canadian networks with French and English content.",
    },
    au: {
      name: "Australia",
      flag: "🇦🇺",
      description:
        "Enjoy ABC, SBS, and all Australian free-to-air channels plus premium sports options.",
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black/70 to-black/60">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={fadeIn}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Choose Your Provider
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Select your region to see available channels and content offerings.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="w-full max-w-md perspective">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={flipped ? "back" : "front"}
                initial="front"
                animate={flipped ? "back" : "front"}
                variants={cardFlip}
                className="relative preserve-3d w-full"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {!flipped ? (
                  <Card className="backface-hidden w-full bg-black/50 border border-gray-800 rounded-2xl overflow-hidden shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-center mb-6">
                        <span className="text-6xl mr-4">
                          {
                            providers[selectedCountry as keyof typeof providers]
                              .flag
                          }
                        </span>
                        <h3 className="text-2xl font-bold text-white">
                          {
                            providers[selectedCountry as keyof typeof providers]
                              .name
                          }
                        </h3>
                      </div>

                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2">
                          Select Region
                        </label>
                        <Select
                          value={selectedCountry}
                          onValueChange={setSelectedCountry}
                        >
                          <SelectTrigger className="w-full bg-white/10 border-gray-700 text-white">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-gray-700">
                            <SelectItem value="us">United States 🇺🇸</SelectItem>
                            <SelectItem value="uk">
                              United Kingdom 🇬🇧
                            </SelectItem>
                            <SelectItem value="ca">Canada 🇨🇦</SelectItem>
                            <SelectItem value="au">Australia 🇦🇺</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter className="px-8 pb-8 pt-0">
                      <Button
                        onClick={() => setFlipped(true)}
                        className="w-full bg-[#0055A4] text-black hover:bg-[#0055A4]/90 rounded-xl"
                      >
                        View Available Content
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card
                    className="backface-hidden absolute inset-0 w-full bg-black/50 border border-gray-800 rounded-2xl overflow-hidden shadow-lg"
                    style={{
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center">
                          <span className="text-2xl mr-2">
                            {
                              providers[
                                selectedCountry as keyof typeof providers
                              ].flag
                            }
                          </span>
                          {
                            providers[selectedCountry as keyof typeof providers]
                              .name
                          }{" "}
                          Content
                        </h3>
                      </div>

                      <p className="text-gray-300 mb-4">
                        {
                          providers[selectedCountry as keyof typeof providers]
                            .description
                        }
                      </p>

                      <div className="mt-6">
                        <h4 className="text-[#0055A4] font-semibold mb-2">
                          Highlights:
                        </h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                          <li>Full HD and 4K channels</li>
                          <li>Local news and programming</li>
                          <li>Premium sports packages</li>
                          <li>Movie channels and on-demand content</li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="px-8 pb-8 pt-0">
                      <Button
                        onClick={() => setFlipped(false)}
                        className="w-full bg-white/10 text-white hover:bg-white/20 rounded-xl"
                      >
                        Back to Selection
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProviderSelection;
