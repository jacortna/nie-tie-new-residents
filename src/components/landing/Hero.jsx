import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Search, FileText } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
{ icon: MessageSquare, label: "Cuéntanos tu situación" },
{ icon: Search, label: "Analizamos tu caso" },
{ icon: FileText, label: "Recibe tu guía" }];


function FingerprintSVG({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 10 C50 10, 10 55, 10 110 C10 165, 50 210, 100 220 C150 210, 190 165, 190 110 C190 55, 150 10, 100 10Z" stroke="#2B2FAA" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M100 28 C62 28, 28 67, 28 110 C28 153, 62 192, 100 202 C138 192, 172 153, 172 110 C172 67, 138 28, 100 28Z" stroke="#2B2FAA" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M100 46 C72 46, 46 76, 46 110 C46 144, 72 180, 100 188 C128 180, 154 144, 154 110 C154 76, 128 46, 100 46Z" stroke="#2B2FAA" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M100 64 C82 64, 64 84, 64 110 C64 136, 82 162, 100 170 C118 162, 136 136, 136 110 C136 84, 118 64, 100 64Z" stroke="#2B2FAA" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M100 82 C90 82, 82 95, 82 110 C82 126, 90 140, 100 145 C110 140, 118 126, 118 110 C118 95, 110 82, 100 82Z" stroke="#2B2FAA" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="110" r="6" fill="#2B2FAA" />
      <path d="M10 105 Q20 100, 28 108" stroke="#2B2FAA" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M172 115 Q182 112, 190 118" stroke="#2B2FAA" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>);

}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3fd4] via-[#2B2FAA] to-[#0d1a6e]" />
      </div>

      <div className="w-full max-w-3xl mx-auto px-6 py-20 flex flex-col items-center text-center">

        {/* Logo */}
        <motion.div
          className="flex flex-col items-center mb-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          
          

          

          
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="font-heading text-3xl sm:text-5xl font-bold text-white leading-tight mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          
          Descubre qué permiso de residencia puedes solicitar en España
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-white/80 leading-relaxed mb-10 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}>
          
          Responde unas preguntas sobre tu situación y te indicamos qué opciones tienes, con requisitos, documentación y plazos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}>
          
          <Link to="/consulta">
            <Button size="lg" className="h-13 px-8 text-base font-semibold gap-2 bg-[#C9A800] hover:bg-[#b89700] text-black rounded-xl shadow-lg">
              Comenzar consulta
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/permisos">
            <Button size="lg" variant="outline" className="h-13 px-8 text-base font-semibold rounded-xl border-white/40 text-white hover:bg-white/10 bg-transparent">
              Ver todos los permisos
            </Button>
          </Link>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}>
          
          {steps.map((s, idx) =>
          <React.Fragment key={idx}>
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5">
                <s.icon className="w-4 h-4 text-[#C9A800]" />
                <span className="text-white text-sm font-medium">{s.label}</span>
              </div>
              {idx < steps.length - 1 &&
            <ArrowRight className="hidden sm:block w-4 h-4 text-white/30 mx-2 flex-shrink-0" />
            }
            </React.Fragment>
          )}
        </motion.div>
      </div>
    </section>);

}