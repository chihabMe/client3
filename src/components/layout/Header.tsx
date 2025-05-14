"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import SpecialOfferHeader from "@/components/layout/SpecialOfferHeader";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/channels", label: "Chaînes" },
    { href: "#features", label: "Fonctionnalités" },
    { href: "#pricing", label: "Tarifs" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12"
      style={{
        backgroundColor: headerBg,
        backdropFilter: `blur(${headerBlur}px)`,
      }}
    >
      <SpecialOfferHeader />
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="text-2xl font-bold text-[#39ff14]"
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 8px rgba(57, 255, 20, 0.8)",
              transition: { duration: 0.2 },
            }}
          >
            IPTV
          </motion.span>
          <motion.span
            className="text-2xl font-bold text-white"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
          >
            King
          </motion.span>
        </motion.div>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-white hover:text-[#39ff14] transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{
                scale: 1.1,
                color: "#39ff14",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(57, 255, 20, 0.7)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-[#39ff14] text-black hover:bg-[#39ff14]/90 ml-4 rounded-2xl">
                Commencer
              </Button>
            </motion.div>
          </motion.div>
        </nav>

        {/* Bouton Menu Mobile */}
        <motion.button
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label="Basculer le menu"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-[#39ff14]" />
          ) : (
            <Menu className="h-6 w-6 text-[#39ff14]" />
          )}
        </motion.button>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "100vh",
              transition: {
                height: { duration: 0.4 },
                opacity: { duration: 0.3 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.4 },
                opacity: { duration: 0.2 },
              },
            }}
            className="fixed inset-0 top-[72px] bg-black/95 backdrop-blur-lg md:hidden"
          >
            <motion.nav
              className="flex flex-col items-center justify-center h-full space-y-8 px-6 py-12"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-white text-2xl font-medium hover:text-[#39ff14] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.1,
                    color: "#39ff14",
                    textShadow: "0 0 5px rgba(57, 255, 20, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: 0.3,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    },
                  },
                }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(57, 255, 20, 0.8)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-[#39ff14] text-black hover:bg-[#39ff14]/90 rounded-2xl w-64 h-14 text-lg mt-8">
                    Commencer
                  </Button>
                </motion.div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
