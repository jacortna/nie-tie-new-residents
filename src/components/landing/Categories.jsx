import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Ciudadanos UE / EEE / Suiza",
    description: "Registro de ciudadano UE, residencia permanente, tarjeta de familiar.",
    items: ["Certificado de registro", "Residencia permanente", "Tarjeta de familiar"],
    gradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200/60",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700"
  },
  {
    title: "Ciudadanos no comunitarios",
    description: "Permisos de trabajo, estudios, reagrupación, nómada digital y más.",
    items: ["Trabajo por cuenta ajena/propia", "Estancia por estudios", "Nómada digital", "Reagrupación familiar"],
    gradient: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200/60",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700"
  },
  {
    title: "Regularización (arraigos)",
    description: "Si estás en situación irregular, existen vías legales para regularizarte.",
    items: ["Arraigo social (3 años)", "Arraigo laboral (2 años)", "Arraigo familiar"],
    gradient: "from-orange-50 to-red-50",
    borderColor: "border-orange-200/60",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700"
  },
  {
    title: "Larga duración y nacionalidad",
    description: "Permisos permanentes y obtención de la nacionalidad española.",
    items: ["Residencia de larga duración", "Nacionalidad española"],
    gradient: "from-indigo-50 to-purple-50",
    borderColor: "border-indigo-200/60",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-700"
  }
];

export default function Categories() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">
            Tipos de permisos que cubrimos
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Información completa sobre todas las opciones de residencia en España
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              className={`bg-gradient-to-br ${cat.gradient} rounded-2xl p-8 border ${cat.borderColor} hover:shadow-lg transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">{cat.title}</h3>
              <p className="text-muted-foreground text-sm mb-5">{cat.description}</p>
              <ul className="space-y-2">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                    <div className={`w-1.5 h-1.5 rounded-full ${cat.iconBg}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            to="/consulta"
            className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
          >
            Descubre cuál te corresponde
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}