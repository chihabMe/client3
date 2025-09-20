import { fadeIn } from "@/lib/motions";
import * as motion from "motion/react-m";

const PricingHeader = () => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl text-black md:text-4xl font-bold mb-4 text-gradient">
        Paiement rapide via PayPal – aucun risque, aucune complication.
      </h2>
      <p className="text-gray-800 max-w-2xl mx-auto">
        Ne ratez pas cette offre ! Abonnez-vous pour 12 mois.
      </p>
    </motion.div>
  );
};

export default PricingHeader;
