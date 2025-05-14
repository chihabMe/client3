"use client"
import React, { useRef } from "react"
import { Tv, Film, Smartphone, Headphones, Zap, MonitorSmartphone } from "lucide-react"
import * as motion from "motion/react-m"
import { useInView } from "motion/react"

interface FeatureProps {
  title: string
  description: string
  icon: React.ReactNode
  highlight?: string
  index: number
}

function Feature({ title, description, icon, highlight, index }: FeatureProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: 0.1 * index,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50 hover:border-[#00ff2a]/30 transition-all duration-300 flex flex-col h-full"
    >
      <motion.h3
        className="text-xl font-bold mb-3"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 * index + 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-gray-400 mb-6 flex-grow"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
      >
        {description.split(highlight || "").map((part, i, arr) => {
          if (i === arr.length - 1) return part
          return (
            <React.Fragment key={i}>
              {part}
              <span className="text-[#00ff2a]">{highlight}</span>
            </React.Fragment>
          )
        })}
      </motion.p>
      <div className="mt-auto flex justify-between items-end">
        <motion.div
          className="w-6 h-6 text-gray-600"
          initial={{ x: -10, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1 * index + 0.4
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </motion.div>
        <motion.div
          className="text-[#ff3e3e] w-12 h-12 flex items-center justify-center"
          initial={{ scale: 0, rotate: -30 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -30 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1 * index + 0.5
          }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section className="py-20 px-4 bg-black relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black pointer-events-none"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p
            className="text-[#00ff2a] text-sm uppercase tracking-wider mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Nos Services
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Pourquoi Choisir Notre Abonnement IPTV ?
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#00ff2a]/0 via-[#00ff2a] to-[#00ff2a]/0 mx-auto mt-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: "6rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Feature
            title="TV en Direct"
            description="Regardez vos chaînes préférées avec un streaming en direct sans interruption. Profitez d'une diffusion stable avec 99,99 % de disponibilité, parfait pour ne jamais manquer vos événements sportifs et émissions préférés."
            highlight="streaming"
            icon={<Tv className="w-full h-full text-[#00ff2a]" />}
            index={0}
          />

          <Feature
            title="Contenu à la Demande"
            description="Accédez à une vaste bibliothèque de films récents, séries populaires et documentaires directement via notre service VOD. Tout votre contenu préféré disponible instantanément."
            highlight=""
            icon={<Film className="w-full h-full text-[#00ff2a]" />}
            index={1}
          />

          <Feature
            title="Qualité HD, UHD, 4K"
            description="Avec IPTV Premium, bénéficiez de la meilleure qualité d’image en HD, UHD et 4K, idéal pour les passionnés de sport, de cinéma et de télévision."
            highlight="IPTV Premium"
            icon={<Zap className="w-full h-full text-[#00ff2a]" />}
            index={2}
          />

          <Feature
            title="Service Client 24/7"
            description="Notre équipe est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions, vous guider dans l’installation et résoudre rapidement les problèmes techniques."
            highlight=""
            icon={<Headphones className="w-full h-full text-[#00ff2a]" />}
            index={3}
          />

          <Feature
            title="Interface Simple & Intuitive"
            description="Notre interface utilisateur est conçue pour une utilisation simple et rapide. Naviguez entre les chaînes et contenus en quelques clics, même pour les débutants."
            highlight=""
            icon={<Smartphone className="w-full h-full text-[#00ff2a]" />}
            index={4}
          />

          <Feature
            title="Compatibilité Multi-Appareils"
            description="Profitez de votre abonnement IPTV sur tous vos appareils : Smart TV, PC, tablette, smartphone, Firestick et bien plus encore."
            highlight="abonnement IPTV"
            icon={<MonitorSmartphone className="w-full h-full text-[#00ff2a]" />}
            index={5}
          />
        </div>
      </div>
    </section>
  )
}
