import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
{ to: "/", label: "Inicio" },
{ to: "/consulta", label: "Consulta" },
{ to: "/permisos", label: "Permisos" }];


function FingerprintMini() {
  return (
    <svg width="48" height="58" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 10 C50 10, 10 55, 10 110 C10 165, 50 210, 100 220 C150 210, 190 165, 190 110 C190 55, 150 10, 100 10Z" stroke="#2B2FAA" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M100 28 C62 28, 28 67, 28 110 C28 153, 62 192, 100 202 C138 192, 172 153, 172 110 C172 67, 138 28, 100 28Z" stroke="#2B2FAA" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M100 46 C72 46, 46 76, 46 110 C46 144, 72 180, 100 188 C128 180, 154 144, 154 110 C154 76, 128 46, 100 46Z" stroke="#2B2FAA" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M100 64 C82 64, 64 84, 64 110 C64 136, 82 162, 100 170 C118 162, 136 136, 136 110 C136 84, 118 64, 100 64Z" stroke="#2B2FAA" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M100 82 C90 82, 82 95, 82 110 C82 126, 90 140, 100 145 C110 140, 118 126, 118 110 C118 95, 110 82, 100 82Z" stroke="#2B2FAA" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="110" r="6" fill="#2B2FAA" />
    </svg>);

}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-[#fdf6e3] border-b border-[#e8d89a]/30">
      <div className="mx-auto pt-3 pr-5 pb-3 pl-4 max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <FingerprintMini />
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-extrabold tracking-tight text-[#2B2FAA]">NIE/IA</span>
            <span className="text-xs font-semibold text-[#C9A800] tracking-widest uppercase">New Residents</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
          <Link
            key={link.to}
            to={link.to}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            location.pathname === link.to ?
            "bg-[#2B2FAA]/8 text-[#2B2FAA]" :
            "text-gray-500 hover:text-[#2B2FAA] hover:bg-gray-50"}`
            }>
            
              {link.label}
            </Link>
          )}
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
          className="md:hidden p-2 rounded-lg hover:bg-[#f5e6b8]"
          onClick={() => setMobileOpen(!mobileOpen)}>
          
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen &&
      <div className="md:hidden border-t border-[#e8d89a]/40 bg-[#fdf6e3] px-6 py-4 space-y-1">
          {navLinks.map((link) =>
        <Link
          key={link.to}
          to={link.to}
          onClick={() => setMobileOpen(false)}
          className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
          location.pathname === link.to ?
          "bg-[#2B2FAA]/8 text-[#2B2FAA]" :
          "text-gray-500 hover:text-[#2B2FAA] hover:bg-gray-50"}`
          }>
          
              {link.label}
            </Link>
        )}
          <Link to="/consulta" onClick={() => setMobileOpen(false)}>
            <Button className="w-full mt-2 rounded-xl font-semibold bg-[#C9A800] hover:bg-[#b89700] text-black">
              Iniciar consulta
            </Button>
          </Link>
        </div>
      }
    </nav>);

}