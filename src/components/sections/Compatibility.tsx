"use client"
import * as motion from "motion/react-m"
import { fadeIn, staggerContainer } from "@/lib/motions"
import { useScrollAnimation } from "@/hook/use-scroll-animation"
import Image from "next/image"
import { Smartphone, Tv, Apple } from "lucide-react"

const Compatibility = () => {
  const { ref, controls } = useScrollAnimation(0.2)

  const devices = [
    {
      id: 1,
      name: "Android TV",
      icon: () => <Image width={150} height={150} alt="image windows" src="/android.png" />,
      color: "",
    },
    {
      id: 2,
      name: "iPhone & iPad",
      icon: (props: any) => <Apple strokeWidth={1.5} {...props} />,
      color: "from-gray-400 to-gray-600",
    },
    {
      id: 3,
      name: "Amazon Fire TV",
      icon: (props: any) => <Tv strokeWidth={1.5} {...props} />,
      color: "from-orange-400 to-orange-600",
    },
    {
      id: 4,
      name: "Samsung Smart TV",
      icon: (props: any) => <Tv strokeWidth={1.5} {...props} />,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: 5,
      name: "LG WebOS",
      icon: (props: any) => <Tv strokeWidth={1.5} {...props} />,
      color: "from-red-400 to-red-600",
    },
    {
      id: 6,
      name: "Téléphones et tablettes Android",
      icon: (props: any) => <Smartphone strokeWidth={1.5} {...props} />,
      color: "from-green-400 to-green-600",
    },
    {
      id: 7,
      name: "PC Windows",
      icon: () => <Image width={150} height={150} alt="image android" src="/windows.png" />,
      color: "",
    },
    {
      id: 8,
      name: "Mac",
      icon: (props: any) => <Apple strokeWidth={1.5} {...props} />,
      color: "from-gray-400 to-gray-600",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div ref={ref} variants={fadeIn} initial="hidden" animate={controls} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text    text-black">
            Disponible sur tous vos appareils
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Profitez d’un streaming fluide sur tous vos appareils préférés grâce à notre compatibilité multiplateforme.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
        >
          {devices.map((device, index) => (
            <motion.div
              key={device.id}
              variants={fadeIn}
              custom={index}
              whileHover={{
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className="flex flex-col items-center"
            >
              <div
                className={`w-32 h-32 rounded-2xl flex items-center justify-center bg-gradient-to-br ${device.color} shadow-lg mb-6 p-6 transform transition-all duration-300`}
              >
                {device.icon({ className: "w-full h-full text-white" })}
              </div>
              <h3 className="text-gray-800 font-medium text-lg text-center">{device.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Compatibility
