import * as motion from "motion/react-m";
import pricingData from "@/data/pricing.json";
import PricingHeader from "./pricingHeader";
import PricingCard from "./PricingCard";
import { fadeIn, staggerContainer } from "@/lib/motions";

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const PricingSection = () => {
  return (
    <section id="ultimate-pricing" className="py-20">
      <div className="container mx-auto px-6">
        <PricingHeader />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
        >
          {pricingData.plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
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

export default PricingSection;
