import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(135deg, #0a0a2a 0%, #10103a 50%, #0a0a2a 100%)", borderTop: "1px solid rgba(201,168,0,0.25)" }} className="text-white py-10 px-6">
      {/* Gold top line */}
      <div className="w-full h-0.5 mb-8" style={{ background: "linear-gradient(90deg, transparent, #C9A800, #f0d060, #C9A800, transparent)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <Link to="/" className="mb-4 flex items-center gap-3">
              <img
                src="https://media.base44.com/images/public/69e9197cebd1f292018179cc/e1c606382_IMG_20260504_095949.png"
                alt="NIE/IA New Residents"
                className="h-16 object-contain"
              />
            </Link>
            <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-sm max-w-sm leading-relaxed">
              Guía informativa sobre permisos de residencia en España.
              Esta herramienta no sustituye el asesoramiento legal profesional.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="font-bold text-xs mb-3 tracking-widest uppercase" style={{ color: "#C9A800" }}>
                Navegación
              </h4>
              <div className="space-y-2">
                {["/", "/consulta", "/permisos"].map((path, i) => (
                  <Link
                    key={path}
                    to={path}
                    className="block text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {["Inicio", "Consulta", "Permisos"][i]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(201,168,0,0.15)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} NIE/IA · New Residents. Información orientativa, no constituye asesoramiento legal.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            Última actualización: Abril 2025
          </p>
        </div>
      </div>
    </footer>
  );
}