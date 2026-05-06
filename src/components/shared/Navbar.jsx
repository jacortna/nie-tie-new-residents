import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/consulta", label: "Consulta" },
  { to: "/permisos", label: "Permisos" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav style={{ background: "linear-gradient(90deg, #10103a 0%, #1a1a6e 50%, #10103a 100%)", borderBottom: "1px solid rgba(201,168,0,0.25)" }} className="sticky top-0 z-50">
      {/* Gold top line */}
      <div className="w-full h-0.5" style={{ background: "linear-gradient(90deg, transparent, #C9A800, #f0d060, #C9A800, transparent)" }} />

      <div className="mx-auto px-5 py-3 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://media.base44.com/images/public/69e9197cebd1f292018179cc/e1c606382_IMG_20260504_095949.png"
            alt="NIE/IA"
            className="h-14 object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                color: location.pathname === link.to ? "#C9A800" : "rgba(255,255,255,0.7)",
                background: location.pathname === link.to ? "rgba(201,168,0,0.12)" : "transparent",
                borderBottom: location.pathname === link.to ? "2px solid #C9A800" : "2px solid transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link to="/consulta">
            <button
              className="text-sm font-bold px-5 py-2 rounded-xl transition-all"
              style={{
                background: "linear-gradient(135deg, #C9A800, #f0d060)",
                color: "#10103a",
                boxShadow: "0 2px 12px rgba(201,168,0,0.35)",
                border: "none",
              }}
            >
              Iniciar consulta
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: "rgba(255,255,255,0.8)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: "#10103a", borderTop: "1px solid rgba(201,168,0,0.2)" }} className="md:hidden px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
              style={{
                color: location.pathname === link.to ? "#C9A800" : "rgba(255,255,255,0.7)",
                background: location.pathname === link.to ? "rgba(201,168,0,0.12)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/consulta" onClick={() => setMobileOpen(false)}>
            <button
              className="w-full mt-2 py-3 rounded-xl font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #C9A800, #f0d060)", color: "#10103a" }}
            >
              Iniciar consulta
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}