"use client"
import { Button } from "@/components/ui/button"
import * as motion from "motion/react-m"
import Image from "next/image"
import Link from "next/link"
import Partners from "./Partners"
import { useMediaQuery } from "@/hook/use-mobile" // Using the hook for responsive behavior

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const Hero = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center py-16 md:py-24 overflow-hidden">
      {/* Background with optimized image loading */}
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
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover object-cover"
          />
        </motion.div>
      </div>

      {/* Animated Stars - Reduced count for mobile */}
      <motion.div
        className="absolute inset-0 z-0 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Main Content - Improved responsive layout */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            variants={fadeIn}
          >
            Un seul abonnement IPTV,
            <motion.span variants={fadeIn} className="block mt-2">
              tout le divertissement réuni.
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                className="h-[2px] sm:h-[3px] bg-[#39ff14] mb-2 mx-auto"
              />
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8 md:mb-10 px-2"
            variants={fadeIn}
          >
            Explorez les meilleurs films, séries, chaînes TV et sports en un seul endroit, accessible à tout moment sur
            tous vos appareils.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
            variants={fadeIn}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
              animate={{
                boxShadow: [
                  "0px 0px 0px rgba(57, 255, 20, 0)",
                  "0px 0px 20px rgba(57, 255, 20, 0.7)",
                  "0px 0px 0px rgba(57, 255, 20, 0)",
                ],
              }}
              transition={{ boxShadow: { repeat: Number.POSITIVE_INFINITY, duration: 2 } }}
            >
              <Link href="#pricing" className="block w-full">
                <Button className="bg-[#39ff14] text-black hover:bg-[#39ff14]/90 text-base sm:text-lg font-medium w-full px-4 sm:px-8 py-5 sm:py-6 rounded-lg h-auto">
                  Profitez maintenant
                </Button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button className="bg-transparent text-white border border-gray-50/80 text-base sm:text-lg font-medium w-full px-4 sm:px-8 py-5 sm:py-6 rounded-lg h-auto">
                Essai gratuit de 1 jour
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Partners section with proper spacing */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <Partners />
        </div>
      </div>
    </section>
  )
}

export default Hero
