import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

function FingerprintMini() {
  return (
    <svg width="64" height="64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 5 C50 5, 8 47, 8 100 C8 153, 50 195, 100 195 C150 195, 192 153, 192 100 C192 47, 150 5, 100 5Z" stroke="#2B2FAA" strokeWidth="7" fill="none" strokeLinecap="round"/>
      <path d="M100 25 C62 25, 28 60, 28 100 C28 140, 62 175, 100 175 C138 175, 172 140, 172 100 C172 60, 138 25, 100 25Z" stroke="#2B2FAA" strokeWidth="6.5" fill="none" strokeLinecap="round"/>
      <path d="M100 45 C72 45, 48 68, 48 100 C48 132, 72 155, 100 155 C128 155, 152 132, 152 100 C152 68, 128 45, 100 45Z" stroke="#2B2FAA" strokeWidth="6" fill="none" strokeLinecap="round"/>
      <path d="M100 65 C82 65, 68 81, 68 100 C68 119, 82 135, 100 135 C118 135, 132 119, 132 100 C132 81, 118 65, 100 65Z" stroke="#2B2FAA" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
      <path d="M100 85 C90 85, 84 92, 84 100 C84 110, 90 117, 100 117 C110 117, 116 110, 116 100 C116 92, 110 85, 100 85Z" stroke="#2B2FAA" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <circle cx="100" cy="100" r="7" fill="#2B2FAA"/>
    </svg>
  );
}

const navLinks = [
{ to: "/", label: "Inicio" },
{ to: "/consulta", label: "Consulta" },
{ to: "/permisos", label: "Permisos" }];



export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-[#fdf6e3] border-b border-[#e8d89a]/30">
      <div className="mx-auto pt-3 pr-5 pb-3 pl-4 max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <FingerprintMini />
          <div className="w-px h-14 bg-[#C9A800] mx-1" />
          <div className="flex flex-col leading-none">
            <span className="text-3xl font-extrabold tracking-tight text-[#C9A800]">NIE/IA</span>
            <span className="text-sm font-semibold text-[#C9A800] tracking-wide">New Residents</span>
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