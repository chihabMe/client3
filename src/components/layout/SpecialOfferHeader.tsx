
import React from "react";
import * as motion from "motion/react-m";
import Link from "next/link";

export default function SpecialOfferHeader() {
  return (
    <motion.div
      className="py-3 z-10 text-center text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <p className="text-sm md:text-xl">
        Offre spéciale : <span className="text-[#00ff2a]  font-bold">3 mois offerts</span> en choisissant le plan annuel –{" "}
        <Link href="/#ultimate-pricing" className="underline hover:text-[#00ff2a]">
          Profitez-en maintenant !
        </Link>
      </p>
    </motion.div>
  );
}
