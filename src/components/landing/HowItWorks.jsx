import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Search, FileText } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Cuéntanos tu situación",
    description: "Responde preguntas sencillas sobre tu nacionalidad, situación actual y objetivos en España."
  },
  {
    icon: Search,
    step: "02",
    title: "Analizamos tu caso",
    description: "Nuestro sistema identifica las opciones de residencia que se adaptan a tu perfil."
  },
  {
    icon: FileText,
    step: "03",
    title: "Recibe tu guía personalizada",
    description: "Obtén información detallada sobre requisitos, pasos a seguir, costes y plazos."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tres pasos simples para aclarar tu situación migratoria
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="relative bg-card rounded-2xl p-8 border border-border/50 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <span className="absolute -top-4 -left-2 text-6xl font-heading font-bold text-secondary/10">
                {step.step}
              </span>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-primary mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}