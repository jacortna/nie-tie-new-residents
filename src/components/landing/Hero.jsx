import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Shield, text: "Información actualizada a 2025" },
  { icon: Clock, text: "Resultado en 2 minutos" },
  { icon: CheckCircle, text: "Guía paso a paso" },
];

// Fingerprint SVG logo matching the brand
function FingerprintLogo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" stroke="#3B3FD8" strokeWidth="3" fill="none"/>
      <path d="M40 14c-14.36 0-26 11.64-26 26 0 7.18 2.91 13.68 7.62 18.38" stroke="#3B3FD8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M40 20c-11.05 0-20 8.95-20 20 0 5.52 2.24 10.52 5.86 14.14" stroke="#3B3FD8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M40 26c-7.73 0-14 6.27-14 14 0 3.86 1.57 7.36 4.1 9.9" stroke="#3B3FD8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M40 32c-4.42 0-8 3.58-8 8 0 2.21.9 4.21 2.34 5.66" stroke="#3B3FD8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="40" cy="40" r="3" fill="#3B3FD8"/>
      <path d="M46 14.5c7.5 3.2 13.5 9.8 15.5 18" stroke="#3B3FD8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M57 34c.67 2 1 4.1 1 6.3 0 4.5-1.5 8.6-4 11.9" stroke="#3B3FD8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M51 23c2.5 2.5 4.2 5.8 4.8 9.5" stroke="#3B3FD8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M48 40c0 4.42-3.58 8-8 8" stroke="#3B3FD8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Full background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="España paisaje"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 py-20 lg:py-28 flex flex-col items-center text-center">

        {/* Brand header: fingerprint + separator + New Residents */}
        <motion.div
          className="flex items-center gap-4 mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FingerprintLogo className="w-14 h-14 drop-shadow-lg" />
          <div className="w-px h-12 bg-[#C9A800]" />
          <span className="font-heading text-4xl sm:text-5xl font-bold text-[#C9A800] drop-shadow-md">
            New Residents
          </span>
        </motion.div>

        {/* NIE/IA subtitle brand */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-white/80 text-sm tracking-widest uppercase font-medium">
            powered by NIE/IA
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Descubre qué permiso de residencia puedes solicitar en España
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-white/85 leading-relaxed mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Responde unas preguntas sobre tu situación y te indicaremos qué opciones
          de residencia tienes. Para ciudadanos comunitarios y no comunitarios.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/consulta">
            <Button size="lg" className="h-14 px-8 text-base font-semibold gap-2 bg-[#C9A800] hover:bg-[#b89700] text-black rounded-xl shadow-lg">
              Comenzar consulta
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/permisos">
            <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold rounded-xl border-white/50 text-white hover:bg-white/10 hover:text-white bg-transparent">
              Ver todos los permisos
            </Button>
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-white/80">
              <feature.icon className="w-4 h-4 text-[#C9A800]" />
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Blue contact banner at bottom */}
      <motion.div
        className="w-full bg-[#1a3fd4]/90 backdrop-blur-sm py-6 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
          <p className="text-base sm:text-lg font-medium leading-snug text-center sm:text-left">
            Llegaste como turista y ves tu futuro aquí. ¿No sabes qué hacer? <span className="font-bold">¡Contáctanos!</span>
          </p>
          <div className="flex flex-col sm:items-end items-center gap-1 flex-shrink-0">
            <a href="mailto:newresidents.sevilla@gmail.com" className="text-[#C9A800] font-semibold hover:underline text-sm sm:text-base">
              newresidents.sevilla@gmail.com
            </a>
            <a href="tel:+34619181671" className="text-white font-bold text-lg hover:underline">
              619 18 16 71
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}