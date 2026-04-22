import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/20 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-xs">N</span>
              </div>
              <span className="font-heading font-bold text-primary">NIE/IA</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Guía informativa sobre permisos de residencia en España.
              Esta herramienta no sustituye el asesoramiento legal profesional.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="font-semibold text-sm mb-3">Navegación</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground">Inicio</Link>
                <Link to="/consulta" className="block text-sm text-muted-foreground hover:text-foreground">Consulta</Link>
                <Link to="/permisos" className="block text-sm text-muted-foreground hover:text-foreground">Permisos</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NIE/IA. Información orientativa, no constituye asesoramiento legal.
          </p>
          <p className="text-xs text-muted-foreground">
            Última actualización: Abril 2025
          </p>
        </div>
      </div>
    </footer>
  );
}