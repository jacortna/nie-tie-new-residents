import React from "react";
import { Link } from "react-router-dom";

function FingerprintMini() {
  return (
    <svg width="32" height="38" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 10 C50 10, 10 55, 10 110 C10 165, 50 210, 100 220 C150 210, 190 165, 190 110 C190 55, 150 10, 100 10Z" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M100 28 C62 28, 28 67, 28 110 C28 153, 62 192, 100 202 C138 192, 172 153, 172 110 C172 67, 138 28, 100 28Z" stroke="white" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M100 46 C72 46, 46 76, 46 110 C46 144, 72 180, 100 188 C128 180, 154 144, 154 110 C154 76, 128 46, 100 46Z" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M100 64 C82 64, 64 84, 64 110 C64 136, 82 162, 100 170 C118 162, 136 136, 136 110 C136 84, 118 64, 100 64Z" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M100 82 C90 82, 82 95, 82 110 C82 126, 90 140, 100 145 C110 140, 118 126, 118 110 C118 95, 110 82, 100 82Z" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeOpacity="0.6"/>
      <circle cx="100" cy="110" r="6" fill="white" fillOpacity="0.6"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#2B2FAA] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <Link to="/" className="mb-4 inline-block">
              <img
                src="https://media.base44.com/images/public/69e9197cebd1f292018179cc/c4ff7b0d6_Logo-copia.jpg"
                alt="New Residents"
                className="h-10 object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 text-sm max-w-sm leading-relaxed">
              Guía informativa sobre permisos de residencia en España.
              Esta herramienta no sustituye el asesoramiento legal profesional.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="font-semibold text-sm mb-3 text-[#C9A800] tracking-wide">Navegación</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-sm text-white/60 hover:text-white transition-colors">Inicio</Link>
                <Link to="/consulta" className="block text-sm text-white/60 hover:text-white transition-colors">Consulta</Link>
                <Link to="/permisos" className="block text-sm text-white/60 hover:text-white transition-colors">Permisos</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} NIE/IA · New Residents. Información orientativa, no constituye asesoramiento legal.
          </p>
          <p className="text-xs text-white/40">
            Última actualización: Abril 2025
          </p>
        </div>
      </div>
    </footer>
  );
}