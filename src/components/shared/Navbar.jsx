import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1a3fd4] flex items-center justify-center shadow">
            <span className="text-white font-heading font-bold text-sm">N</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-bold text-[#1a3fd4] text-base">NIE/IA</span>
            <span className="text-[#C9A800] text-xs font-semibold tracking-wide">New Residents</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === link.to
                  ? "bg-[#1a3fd4]/8 text-[#1a3fd4]"
                  : "text-gray-500 hover:text-[#1a3fd4] hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link to="/consulta">
            <Button size="sm" className="rounded-xl font-semibold bg-[#C9A800] hover:bg-[#b89700] text-black shadow">
              Iniciar consulta
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === link.to
                  ? "bg-[#1a3fd4]/8 text-[#1a3fd4]"
                  : "text-gray-500 hover:text-[#1a3fd4] hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/consulta" onClick={() => setMobileOpen(false)}>
            <Button className="w-full mt-2 rounded-xl font-semibold bg-[#C9A800] hover:bg-[#b89700] text-black">
              Iniciar consulta
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}