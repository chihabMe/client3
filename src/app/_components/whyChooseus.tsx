"use client";
import React, { useRef } from "react";
import { Tv, Film, Zap, MonitorSmartphone } from "lucide-react";
import * as motion from "motion/react-m";
import { useInView } from "motion/react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: string;
  index: number;
}

function Feature({ title, description, icon, highlight, index }: FeatureProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: 0.1 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      className=" backdrop-blur-sm rounded-lg p-6 border border-gray-400/50 hover:border-[#00ff2a]/20 transition-all duration-300 flex flex-col h-full"
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
        className="text-gray-800 mb-6 flex-grow"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
      >
        {description.split(highlight || "").map((part, i, arr) => {
          if (i === arr.length - 1) return part;
          return (
            <React.Fragment key={i}>
              {part}
              <span className="text-[#0055A4]">{highlight}</span>
            </React.Fragment>
          );
        })}
      </motion.p>
      <div className="mt-auto flex justify-between items-end">
        <motion.div
          className="w-6 h-6 text-gray-800"
          initial={{ x: -10, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1 * index + 0.4,
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
          animate={
            isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -30 }
          }
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1 * index + 0.5,
          }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section className="py-20 px-4  relative overflow-hidden" ref={sectionRef}>
      <div className="container text-black mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Pourquoi Choisir Notre Abonnement IPTV ?
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#0055A4]/0 via-[#0055A4] to-[#0055A4]/0 mx-auto mt-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: "6rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Feature
            title="Protection Premium"
            description="Grâce à nos serveurs haut de gamme équipés des dernières technologies anti-gel et anti-freeze, nous vous offrons l’expérience IPTV la plus stable et la plus fiable du marché."
            highlight="streaming"
            icon={<Tv className="w-full h-full text-[#0055A4]" />}
            index={0}
          />

          <Feature
            title="Fonctionne avec"
            description="Notre abonnement IPTV est entièrement compatible avec toutes les applications populaires, TV Box et appareils disponibles sur le marché. Que vous regardiez sur votre smartphone, tablette, ou télévision connectée, profitez d’une expérience fluide et sans interruption. Accédez à plus de 55 000 chaînes et à un large choix de films et séries en streaming, où que vous soyez et sur tous vos dispositifs."
            highlight=""
            icon={<Film className="w-full h-full text-[#0055A4]" />}
            index={1}
          />

          <Feature
            title="Performance Premium"
            description="Grâce à nos serveurs de dernière génération, profitez de vos émissions et événements préférés avec une qualité et une performance exceptionnelles."
            highlight="performance"
            icon={<Zap className="w-full h-full text-[#0055A4]" />}
            index={2}
          />

          <Feature
            title="Contenu Premium Illimité"
            description="Accédez aux meilleures chaînes premium du monde entier, ainsi qu’aux films et séries les plus populaires, le tout en illimité et à portée de clic."
            highlight="abonnement IPTV"
            icon={
              <MonitorSmartphone className="w-full h-full text-[#0055A4]" />
            }
            index={5}
          />
        </div>
      </div>
    </section>
  );
}
