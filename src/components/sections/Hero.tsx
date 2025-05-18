import React from "react";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-m";
import Image from "next/image";
import Link from "next/link";
import Partners from "./Partners";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const Hero = () => (
  <section
    id="home"
    className="relative min-h-screen flex items-center py-12 md:py-16 overflow-hidden"
  >
    {/* Background - Improved for responsiveness */}
    <div className="absolute inset-0 z-0">
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full h-full relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40 z-10" />
        <Image
          src="/background.png"
          alt="Hero background"
          fill
          priority
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          className="object-cover object-center"
          style={{ objectPosition: "center 30%" }}
        />
      </motion.div>
    </div>

    {/* Animated Stars - Reduced quantity for mobile */}
    <motion.div
      className="absolute inset-0 z-0 opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>

    {/* Main Content - Improved for mobile */}
    <div className="container mx-auto px-4 sm:px-6 pt-10 relative z-10 mt-16 md:mt-20">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          variants={fadeIn}
        >
          Adieu aux abonnements multiples, vivez une expérience de
          divertissement complète avec un seul abonnement IPTV.
          <motion.span variants={fadeIn} className="block mt-2">
            tout le divertissement réuni.
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              className="h-[2px] md:h-[3px] bg-[#0055A4] mb-2 mx-auto"
            />
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 md:mb-10"
          variants={fadeIn}
        >
          Avec MEDIA FRANCE IPTV, Accédez à plus de 55 000 chaînes TV et 90 000
          VOD et séries en qualité 4K sur tous vos appareils
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
          variants={fadeIn}
        >
          <Link href="#ultimate-pricing" className="">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
              transition={{ boxShadow: { repeat: Infinity, duration: 2 } }}
            >
              <Button
                className="bg-[#0055A4] text-white hover:bg-[#0055A4]/90 text-base md:text-lg font-medium w-full px-6 py-5 md:px-8 md:py-6 rounded-lg"
                size="lg"
              >
                Profitez maintenant
              </Button>
            </motion.div>
          </Link>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto"
          >
            <Link href="#ultimate-pricing">
              <Button
                size="lg"
                className="bg-transparent text-white border border-gray-50/80 text-base md:text-lg font-medium w-full px-6 py-5 md:px-8 md:py-6 rounded-lg"
              >
                1 jour d’essai gratuit
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Partners section with proper spacing */}
      <div className="mt-8 md:mt-24">
        <Partners />
      </div>
    </div>
  </section>
);

export default Hero;
