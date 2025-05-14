"use client"
import { useState, useEffect, useRef } from 'react'
import * as motion from "motion/react-m"
import { useInView } from 'motion/react'

interface StatProps {
  value: string
  label: string
  description: string
}

function Stat({ value, label, description }: StatProps) {
  const [count, setCount] = useState(0)
  const finalValue = parseInt(value.replace(/\D/g, ''))
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!isInView) return

    // let start = 0
    const duration = 2000
    const startTime = Date.now()

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime
      const progress = Math.min(elapsedTime / duration, 1)

      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
      const easedProgress = easeOut(progress)

      setCount(Math.floor(easedProgress * finalValue))

      if (progress === 1) {
        clearInterval(timer)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [finalValue, isInView])

  const formattedCount = value.includes(',')
    ? count.toLocaleString() + (value.includes('+') ? '+' : '')
    : count + (value.includes('+') ? '+' : '')

  return (
    <motion.div
      ref={ref}
      className="text-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-[#00ff2a] text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
        initial={{ scale: 0.8 }}
        animate={isInView ? { scale: 1 } : { scale: 0.8 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        {formattedCount}
      </motion.div>
      <motion.div
        className="text-white font-medium mb-3"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        {label}
      </motion.div>
      <motion.div
        className="h-1 w-full max-w-[200px] mx-auto bg-gradient-to-r from-[#00ff2a]/0 via-[#00ff2a] to-[#00ff2a]/0 mb-4"
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      ></motion.div>
      <motion.p
        className="text-gray-400 text-sm max-w-xs mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5 }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

export default function KeyStats() {
  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Stat
            value="5+"
            label="Années d'excellence IPTV"
            description="Plus de cinq ans à offrir une expérience IPTV premium."
          />
          <Stat
            value="3,200+"
            label="Chaînes TV en direct"
            description="Profitez d’un vaste choix de chaînes du monde entier."
          />
          <Stat
            value="32+"
            label="Pays desservis"
            description="Compatibilité mondiale pour répondre à tous vos besoins."
          />
          <Stat
            value="100%"
            label="Disponibilité garantie"
            description="Un service IPTV fiable et stable, disponible 24h/24 et 7j/7."
          />
        </div>
      </div>
    </section>
  )
}
