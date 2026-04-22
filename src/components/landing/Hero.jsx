import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Shield, text: "Información actualizada a 2025" },
  { icon: Clock, text: "Resultado en 2 minutos" },
  { icon: CheckCircle, text: "Guía paso a paso" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-8">
              <span className="text-sm font-medium text-secondary">🇪🇸 NIE/IA · Tu guía de permisos en España</span>
            </div>
          </motion.div>

          <motion.h1
            className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Descubre qué permiso de residencia puedes solicitar
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Responde unas preguntas sobre tu situación y te indicaremos qué opciones
            de residencia tienes en España. Para ciudadanos comunitarios y no comunitarios.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/consulta">
              <Button size="lg" className="h-14 px-8 text-base font-semibold gap-2 bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20">
                Comenzar consulta
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/permisos">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold rounded-xl">
                Ver todos los permisos
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                <feature.icon className="w-4 h-4 text-secondary" />
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}