import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MessageSquare, Zap, Shield, RefreshCw, CheckCircle2 } from "lucide-react";
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
    <section
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #f8f4ec 0%, #f0e8d0 30%, #e8ddc0 60%, #1a1a3e 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Marble texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse at 20% 20%, rgba(201,168,0,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(26,26,62,0.15) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Gold top accent line */}
      <div className="w-full h-1" style={{ background: "linear-gradient(90deg, #C9A800, #f0d060, #C9A800)" }} />

      <div className="relative z-10 flex flex-col flex-1 px-5 pt-8 pb-10 max-w-lg mx-auto w-full gap-7">

        {/* Hero headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: "#C9A800", letterSpacing: "0.18em" }}>
            ✦ Tu guía de residencia en España
          </p>
          <h1
            translate="no"
            className="font-extrabold leading-[1.08] mb-4"
            style={{
              fontSize: "clamp(2.2rem, 8vw, 3.2rem)",
              color: "#1a1a2e",
              textShadow: "0 2px 12px rgba(201,168,0,0.10)",
            }}
          >
            Todo para tu{" "}
            <span style={{ color: "#C9A800" }}>NIE/IA</span>
            <br />
            en un solo lugar.
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#5a5a7a" }}>
            Obtén una guía personalizada para tu solicitud de residencia. Gratis, confiable y actualizada.
          </p>
        </motion.div>

        {/* Main input card — premium */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: "1.5rem",
            boxShadow: "0 8px 40px rgba(26,26,62,0.13), 0 1px 0 rgba(201,168,0,0.3) inset",
            border: "1.5px solid rgba(201,168,0,0.25)",
            padding: "1.5rem",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1a1a3e, #2B2FAA)" }}
            >
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: "#1a1a2e" }}>
              Háblanos de tu situación
            </span>
          </div>

          <div className="relative">
            <textarea
              value={situacion}
              onChange={(e) => setSituacion(e.target.value.slice(0, MAX))}
              placeholder="Ej: Soy colombiana, llevo 6 meses en España trabajando sin contrato..."
              className="w-full text-sm text-gray-700 placeholder-gray-400 p-3 resize-none focus:outline-none"
              style={{
                background: "#f8f4ec",
                borderRadius: "0.85rem",
                border: "1.5px solid #e8ddc0",
                minHeight: "100px",
                lineHeight: 1.6,
              }}
            />
            <span className="absolute bottom-2 right-3 text-xs text-gray-400">
              {situacion.length}/{MAX}
            </span>
          </div>

          <button
            onClick={handleAnalizar}
            disabled={!situacion.trim()}
            className="mt-3 w-full flex items-center justify-center gap-2 font-bold text-base transition-all"
            style={{
              background: situacion.trim()
                ? "linear-gradient(135deg, #C9A800, #f0d060, #C9A800)"
                : "#e0d8c0",
              color: situacion.trim() ? "#1a1a2e" : "#a0a090",
              borderRadius: "1rem",
              padding: "0.9rem 1.5rem",
              boxShadow: situacion.trim() ? "0 4px 18px rgba(201,168,0,0.35)" : "none",
              cursor: situacion.trim() ? "pointer" : "not-allowed",
              border: "none",
              fontSize: "1rem",
            }}
          >
            Analizar mi situación <ArrowRight className="w-5 h-5" />
          </button>

          {/* Mini trust line */}
          <div className="flex items-center gap-1.5 mt-3 justify-center">
            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#C9A800" }} />
            <span className="text-xs" style={{ color: "#8a8aaa" }}>
              Guía completa y segura
            </span>
          </div>
        </motion.div>

        {/* Trust badges — premium style */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { icon: Zap, label: "100% GRATIS", sub: "con publicidad" },
            { icon: Shield, label: "Información", sub: "confiable" },
            { icon: RefreshCw, label: "Actualizado", sub: "2025" },
          ].map((b, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 py-3 px-2 text-center"
              style={{
                background: "rgba(255,255,255,0.55)",
                borderRadius: "1rem",
                border: "1px solid rgba(201,168,0,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1a1a3e, #2B2FAA)" }}
              >
                <b.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-bold" style={{ color: "#1a1a2e" }}>
                {b.label}
              </span>
              <span className="text-xs" style={{ color: "#8a8aaa" }}>
                {b.sub}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Bottom gold accent bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            background: "linear-gradient(135deg, #1a1a3e 0%, #2B2FAA 50%, #1a1a3e 100%)",
            borderRadius: "1.25rem",
            padding: "1rem 1.25rem",
            border: "1px solid rgba(201,168,0,0.3)",
            boxShadow: "0 4px 20px rgba(26,26,62,0.2)",
          }}
          className="flex items-center gap-3"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(201,168,0,0.15)", border: "1px solid rgba(201,168,0,0.4)" }}
          >
            <span className="text-lg">🇪🇸</span>
          </div>
          <div>
            <p className="text-xs font-bold text-white">Miles de personas ya encontraron su camino</p>
            <p className="text-xs" style={{ color: "rgba(201,168,0,0.8)" }}>
              NIE/IA · New Residents · España
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}