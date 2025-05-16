import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as motion from "motion/react-m"
import { Check } from "lucide-react";
import pricingData from "@/data/pricing.json";

export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const Pricing = () => {
  return (
    <section
      id="ultimate-pricing"
      className="py-20"
    >
      <div className="container mx-auto  px-6">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Choisissez votre formule
          </h2>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Sélectionnez l'abonnement parfait qui correspond à vos besoins.
            Toutes les formules incluent un streaming de haute qualité sans engagement à long terme.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
        >
          {pricingData.plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={fadeIn}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className={`flex flex-col h-full ${plan.highlighted ? "relative z-10 scale-105 md:scale-110" : ""
                }`}
            >
              <Card
                className={`flex flex-col h-full bg-white/10 border ${plan.highlighted
                  ? "border-[#39ff14] shadow-[#39ff14]"
                  : "border-gray-800"
                  } rounded-2xl overflow-hidden`}
              >
                {plan.highlighted && (
                  <div className="bg-[#39ff14] py-1.5 text-white font-medium text-center text-sm">
                    RECOMMANDÉ
                  </div>
                )}

                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
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
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#39ff14]/20 flex items-center justify-center mr-3">
                          <Check className="w-3 h-3 text-[#39ff14]" />
                        </span>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4 pb-8 px-6">
                  <Button
                    className={`w-full rounded-xl py-6 ${plan.highlighted
                      ? "bg-[#39ff14] text-white hover:bg-[#39ff14]/90"
                      : "bg-black/60 text-white hover:bg-black/80"
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
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-800 mt-10"
        >
          Toutes les offres incluent 3 mois gratuits.
        </motion.p>
      </div>
    </section>
  );
};
export default Pricing;
