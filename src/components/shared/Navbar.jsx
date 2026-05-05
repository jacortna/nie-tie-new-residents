import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
{ to: "/", label: "Inicio" },
{ to: "/consulta", label: "Consulta" },
{ to: "/permisos", label: "Permisos" }];



export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-[#fdf6e3] border-b border-[#e8d89a]/30">
      <div className="mx-auto pt-4 pr-5 pb-4 pl-4 max-w-7xl flex items-center justify-between">
        <Link to="/">
          <img
            src="https://media.base44.com/images/public/69e9197cebd1f292018179cc/07f744cec_IMG_20260504_095949.png"
            alt="NIE/IA New Residents"
            className="h-16 object-contain"
          />
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