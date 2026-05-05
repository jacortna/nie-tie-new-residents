import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MessageSquare, List, Zap, Shield, RefreshCw, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const [situacion, setSituacion] = useState("");
  const navigate = useNavigate();
  const MAX = 600;

  const handleAnalizar = () => {
    if (situacion.trim()) {
      navigate("/consulta", { state: { situacion } });
    }
  };

  return (
    <section className="min-h-screen px-4 pt-10 pb-16 flex flex-col" style={{ background: 'linear-gradient(160deg, #fdf6e3 0%, #f5e0a0 40%, #f0d080 70%, #fdf6e3 100%)' }}>
      <div className="max-w-lg mx-auto w-full flex flex-col gap-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          
          <h1 translate="no" className="text-[#1a1a2e] text-4xl sm:text-5xl font-extrabold leading-tight mb-3">Tu futuro en España
comienza aquí.



          </h1>
          <p className="text-[#555] text-base leading-relaxed">Obtén una guía para tu solicitud de Residencia, GRATIS


          </p>
        </motion.div>

        {/* Situation box */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}>
          
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-[#1a3fd4]" />
            <span className="font-bold text-[#1a1a2e] text-sm">ESCRIBE TU SITUACI</span>
          </div>
          <div className="relative">
            <textarea
              value={situacion}
              onChange={(e) => setSituacion(e.target.value.slice(0, MAX))}
              placeholder="Ejemplo: Soy colombiana, llevo 6 meses en España trabajando sin contrato y alquilo una habitación."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#C9A800]/40 min-h-[100px]" />
            
            <span className="absolute bottom-2 right-3 text-xs text-gray-400">
              {situacion.length}/{MAX}
            </span>
          </div>
          <button
            onClick={handleAnalizar}
            disabled={!situacion.trim()}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-[#C9A800] hover:bg-[#b89600] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-lg rounded-2xl py-4 transition-colors shadow-md">
            
            Analizar mi situación <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>


        {/* Trust badges */}
        <motion.div
          className="flex items-center justify-around gap-2 py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}>
          
          {[
          { icon: Zap, label: "100% GRATIS", sub: "con publicidad" },
          { icon: Shield, label: "Información", sub: "confiable" },
          { icon: RefreshCw, label: "Actualizado", sub: "2025" }].
          map((b, i) =>
          <div key={i} className="flex flex-col items-center gap-1 text-center">
              <b.icon className="w-5 h-5 text-[#1a3fd4]" />
              <span className="text-xs font-bold text-[#1a1a2e]">{b.label}</span>
              <span className="text-xs text-gray-500">{b.sub}</span>
            </div>
          )}
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}>
          
          <Heart className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-gray-600">Miles de personas como tú ya encontraron su camino en España.</p>
        </motion.div>

      </div>
    </section>);

}