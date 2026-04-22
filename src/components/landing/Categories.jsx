import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Ciudadanos UE / EEE / Suiza",
    description: "Registro de ciudadano UE, residencia permanente, tarjeta de familiar.",
    items: ["Certificado de registro", "Residencia permanente", "Tarjeta de familiar"],
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
    accent: "#1a3fd4",
  },
  {
    title: "Ciudadanos no comunitarios",
    description: "Permisos de trabajo, estudios, reagrupación familiar, nómada digital y más.",
    items: ["Trabajo por cuenta ajena/propia", "Estancia por estudios", "Nómada digital", "Reagrupación familiar"],
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
    accent: "#C9A800",
  },
  {
    title: "Regularización (arraigos)",
    description: "Si estás en situación irregular, existen vías legales para regularizarte.",
    items: ["Arraigo social (3 años)", "Arraigo laboral (2 años)", "Arraigo familiar"],
    image: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=600&q=80",
    accent: "#1a3fd4",
  },
  {
    title: "Larga duración y nacionalidad",
    description: "Permisos permanentes y obtención de la nacionalidad española.",
    items: ["Residencia de larga duración", "Nacionalidad española"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    accent: "#C9A800",
  }
];

export default function Categories() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 bg-[#1a3fd4]/10 text-[#1a3fd4] text-sm font-semibold rounded-full mb-4">
            Todos los perfiles
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1a3fd4] mb-4">
            Tipos de permisos que cubrimos
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Información completa sobre todas las opciones de residencia en España
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              className="group rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-[#C9A800]/50 hover:shadow-xl transition-all duration-300 bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold mb-2" style={{ color: cat.accent }}>
                  {cat.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{cat.description}</p>
                <ul className="space-y-1.5">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A800]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
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
            className="inline-flex items-center gap-2 bg-[#1a3fd4] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#1a3fd4]/90 transition-colors shadow-lg shadow-[#1a3fd4]/20"
          >
            Descubre cuál te corresponde
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}