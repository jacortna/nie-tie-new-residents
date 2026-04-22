import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Search, FileText } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Cuéntanos tu situación",
    description: "Responde preguntas sencillas sobre tu nacionalidad, situación actual y objetivos en España.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
  },
  {
    icon: Search,
    step: "02",
    title: "Analizamos tu caso",
    description: "Nuestro sistema identifica las opciones de residencia que se adaptan exactamente a tu perfil.",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&q=80"
  },
  {
    icon: FileText,
    step: "03",
    title: "Recibe tu guía personalizada",
    description: "Obtén requisitos exactos, documentación necesaria, dónde presentarla y plazos.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 bg-[#C9A800]/10 text-[#C9A800] text-sm font-semibold rounded-full mb-4">
            Simple y rápido
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1a3fd4] mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Tres pasos para aclarar tu situación migratoria en menos de 2 minutos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="group rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-[#C9A800]/40 transition-all duration-300 hover:shadow-xl bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3fd4]/70 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#C9A800] flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-heading text-2xl font-bold opacity-60">{step.step}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-[#1a3fd4] mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}