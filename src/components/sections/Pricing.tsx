"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import pricingData from "@/data/pricing.json";
import { fadeIn, staggerContainer } from "@/lib/motions";
import { useScrollAnimation } from "@/hook/use-scroll-animation";

const Pricing = () => {
  const { ref, controls } = useScrollAnimation(0.1);

  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-b from-black/40 to-black/60"
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={fadeIn}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Choose Your Plan
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Select the perfect subscription that suits your needs. All plans
            include high-quality streaming with no long-term commitments.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
        >
          {pricingData.plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={fadeIn}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className={`flex flex-col h-full ${
                plan.highlighted ? "relative z-10 scale-105 md:scale-110" : ""
              }`}
            >
              <Card
                className={`flex flex-col h-full bg-black/60 border ${
                  plan.highlighted
                    ? "border-[#39ff14] shadow-[#39ff14]"
                    : "border-gray-800"
                } rounded-2xl overflow-hidden`}
              >
                {plan.highlighted && (
                  <div className="bg-[#39ff14] py-1.5 text-black font-medium text-center text-sm">
                    RECOMMENDED
                  </div>
                )}

                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4 flex justify-center items-baseline">
                    <span className="text-5xl font-extrabold text-white">
                      ${plan.price}
                    </span>
                    <span className="ml-1 text-gray-400">/{plan.period}</span>
                  </div>
                  <p className="mt-2 text-gray-400">{plan.description}</p>
                </CardHeader>

                <CardContent className="flex-grow">
                  <ul className="space-y-3 mt-6">
                    {plan.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#39ff14]/20 flex items-center justify-center mr-3">
                          <Check className="w-3 h-3 text-[#39ff14]" />
                        </span>
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4 pb-8 px-6">
                  <Button
                    className={`w-full rounded-xl py-6 ${
                      plan.highlighted
                        ? "bg-[#39ff14] text-black hover:bg-[#39ff14]/90"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-400 mt-10"
        >
          All plans include a 7-day free trial. Cancel anytime. No contracts.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
