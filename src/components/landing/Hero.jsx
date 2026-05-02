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
    <section className="min-h-screen bg-gradient-to-br from-[#fdf6e3] via-[#faf0d0] to-[#f5e6b8] px-4 pt-10 pb-16 flex flex-col">
      <div className="max-w-lg mx-auto w-full flex flex-col gap-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[#1a1a2e] text-4xl sm:text-5xl font-extrabold leading-tight mb-3">
            Tu futuro en{" "}
            <span className="text-[#C9A800]">España</span>
            <br />comienza aquí.
            <br />Encuentra el{" "}
            <span className="text-[#C9A800]">camino</span>
            <br />
            <span className="text-[#C9A800]">para hacerlo realidad.</span>
          </h1>
          <p className="text-[#444] text-base leading-relaxed">
            Tus sueños merecen un plan claro y alcanzable.<br />
            Te ayudamos gratis a encontrarlo para ti.
          </p>
        </motion.div>

        {/* Situation box */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-[#1a3fd4]" />
            <span className="font-bold text-[#1a1a2e] text-sm">Escribe tu situación actual</span>
          </div>
          <div className="relative">
            <textarea
              value={situacion}
              onChange={(e) => setSituacion(e.target.value.slice(0, MAX))}
              placeholder="Ejemplo: Soy colombiana, llevo 6 meses en España trabajando sin contrato y alquilo una habitación."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#C9A800]/40 min-h-[100px]"
            />
            <span className="absolute bottom-2 right-3 text-xs text-gray-400">
              {situacion.length}/{MAX}
            </span>
          </div>
          <button
            onClick={handleAnalizar}
            disabled={!situacion.trim()}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-[#C9A800] hover:bg-[#b89700] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-base rounded-xl py-3.5 transition-colors"
          >
            Analizar mi situación <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Alternative: wizard */}
        <motion.button
          onClick={() => navigate("/consulta")}
          className="bg-[#fdf0c0] border border-[#C9A800]/30 rounded-2xl p-4 flex items-center justify-between gap-4 hover:bg-[#fce97a]/30 transition-colors text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C9A800]/20 flex items-center justify-center flex-shrink-0">
              <List className="w-5 h-5 text-[#b89700]" />
            </div>
            <div>
              <p className="font-bold text-[#1a1a2e] text-sm">¿Prefieres responder preguntas definidas?</p>
              <p className="text-xs text-gray-500 mt-0.5">Te haremos algunas preguntas para entender tu caso y darte el permiso que mejor se adapta a ti.</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-[#b89700] flex-shrink-0" />
        </motion.button>

        {/* Trust badges */}
        <motion.div
          className="flex items-center justify-around gap-2 py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {[
            { icon: Zap, label: "100% GRATIS", sub: "con publicidad" },
            { icon: Shield, label: "Información", sub: "confiable" },
            { icon: RefreshCw, label: "Actualizado", sub: "2025" },
          ].map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-1 text-center">
              <b.icon className="w-5 h-5 text-[#1a3fd4]" />
              <span className="text-xs font-bold text-[#1a1a2e]">{b.label}</span>
              <span className="text-xs text-gray-500">{b.sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <Heart className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-gray-600">Miles de personas como tú ya encontraron su camino en España.</p>
        </motion.div>

      </div>
    </section>
  );
}