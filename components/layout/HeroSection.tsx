"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";

type Props = {
  name: string;
  bio: string;
  ctaResearch: string;
  ctaAbout: string;
};

export default function HeroSection({
  name,
  bio,
  ctaResearch,
  ctaAbout,
}: Props) {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg.webp')" }}
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenido centrado */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl font-light text-white mb-6 leading-tight"
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto font-light"
        >
          {bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/research"
            className="inline-flex items-center gap-2 bg-white text-gray-900 text-sm px-6 py-3 rounded hover:bg-secondary hover:text-white transition-colors"
          >
            {ctaResearch}
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-white/60 text-white text-sm px-6 py-3 rounded hover:bg-white/10 transition-colors"
          >
            {ctaAbout}
          </Link>
        </motion.div>
      </div>

      {/* Flecha hacia abajo */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
        aria-label="Scroll"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  );
}
