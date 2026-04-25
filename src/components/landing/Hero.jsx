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

function FingerprintSVG({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer loops */}
      <path d="M100 10 C50 10, 10 55, 10 110 C10 165, 50 210, 100 220 C150 210, 190 165, 190 110 C190 55, 150 10, 100 10Z" stroke="#2B2FAA" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M100 28 C62 28, 28 67, 28 110 C28 153, 62 192, 100 202 C138 192, 172 153, 172 110 C172 67, 138 28, 100 28Z" stroke="#2B2FAA" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M100 46 C72 46, 46 76, 46 110 C46 144, 72 180, 100 188 C128 180, 154 144, 154 110 C154 76, 128 46, 100 46Z" stroke="#2B2FAA" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M100 64 C82 64, 64 84, 64 110 C64 136, 82 162, 100 170 C118 162, 136 136, 136 110 C136 84, 118 64, 100 64Z" stroke="#2B2FAA" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M100 82 C90 82, 82 95, 82 110 C82 126, 90 140, 100 145 C110 140, 118 126, 118 110 C118 95, 110 82, 100 82Z" stroke="#2B2FAA" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Center dot */}
      <circle cx="100" cy="110" r="6" fill="#2B2FAA"/>
      {/* Break lines for fingerprint effect */}
      <path d="M10 105 Q20 100, 28 108" stroke="#2B2FAA" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M172 115 Q182 112, 190 118" stroke="#2B2FAA" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M46 145 Q55 150, 60 160" stroke="#2B2FAA" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M154 145 Q145 152, 142 162" stroke="#2B2FAA" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M64 170 Q72 176, 75 185" stroke="#2B2FAA" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M136 170 Q128 177, 126 186" stroke="#2B2FAA" strokeWidth="3" fill="none" strokeLinecap="round"/>
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/65" />
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 py-20 lg:py-28 flex flex-col items-center text-center">

        {/* Logo block: fingerprint + gold line + NIE/IA + New Residents */}
        <motion.div
          className="flex flex-col items-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Fingerprint */}
          <div className="w-28 h-32 mb-4 drop-shadow-[0_0_24px_rgba(43,47,170,0.5)]">
            <FingerprintSVG className="w-full h-full" />
          </div>
          {/* Gold separator line */}
          <div className="w-40 h-px bg-[#C9A800] mb-4" />
          {/* NIE/IA */}
          <span className="font-heading text-5xl sm:text-6xl font-bold text-[#C9A800] tracking-widest leading-none">
            NIE/IA
          </span>
          {/* New Residents */}
          <span className="font-heading text-xl sm:text-2xl font-semibold text-[#C9A800] tracking-wider mt-1">
            New Residents
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
    </section>
  );
}