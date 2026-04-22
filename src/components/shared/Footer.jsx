import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1a3fd4] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">N</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-white text-base">NIE/IA</span>
                <span className="text-[#C9A800] text-xs font-semibold tracking-wide">New Residents</span>
              </div>
            </Link>
            <p className="text-white/70 text-sm max-w-sm leading-relaxed">
              Guía informativa sobre permisos de residencia en España.
              Esta herramienta no sustituye el asesoramiento legal profesional.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="font-semibold text-sm mb-3 text-[#C9A800]">Navegación</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-sm text-white/70 hover:text-white transition-colors">Inicio</Link>
                <Link to="/consulta" className="block text-sm text-white/70 hover:text-white transition-colors">Consulta</Link>
                <Link to="/permisos" className="block text-sm text-white/70 hover:text-white transition-colors">Permisos</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} NIE/IA · New Residents. Información orientativa, no constituye asesoramiento legal.
          </p>
          <p className="text-xs text-white/50">
            Última actualización: Abril 2025
          </p>
        </div>
      </div>
    </footer>
  );
}