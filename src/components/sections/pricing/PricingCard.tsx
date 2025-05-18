"use client";
import * as motion from "motion/react-m";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PricingPlan } from "./PricingSection";
import { fadeIn } from "../Pricing";
import SubscriptionModal from "@/components/modals/SubscriptionModal";
import { useState } from "react";

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const onSubscribe = () => {
    setIsModalOpen(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      className={`flex flex-col h-full relative ${
        plan.highlighted ? "relative z-10 scale-105 md:scale-110" : ""
      }`}
    >
      <Card
        className={`flex flex-col h-full bg-white/10 border ${
          plan.highlighted
            ? "border-[#0055A4] shadow-[#0055A4]"
            : "border-gray-800"
        } rounded-2xl overflow-hidden`}
      >
        {plan.highlighted && (
          <div className="bg-[#0055A4] py-1.5 text-white font-medium text-center text-sm">
            Profitez de 25% de Réduction
          </div>
        )}

        <CardHeader className="text-center pt-8">
          <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
          <div className="mt-4 flex justify-center items-baseline">
            <span className="text-5xl font-extrabold text-black">
              ${plan.price}
            </span>
            <span className="ml-1 text-gray-800">/{plan.period}</span>
          </div>
          <p className="mt-2 text-gray-800">{plan.description}</p>
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
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0055A4]/20 flex items-center justify-center mr-3">
                  <Check className="w-3 h-3 text-[#0055A4]" />
                </span>
                <span className="text-gray-700">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="pt-4 pb-8 px-6">
          <Button
            onClick={onSubscribe}
            className={`w-full cursor-pointer rounded-xl py-6 ${
              plan.highlighted
                ? "bg-[#0055A4] text-white hover:bg-[#0055A4]/90"
                : "bg-black text-white hover:bg-black/80"
            }`}
          >
            {plan.cta}
          </Button>

          <SubscriptionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            plan={plan}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PricingCard;
