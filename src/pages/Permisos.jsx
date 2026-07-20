import React, { useState } from "react";
import { motion } from "framer-motion";
import { PERMITS } from "../lib/permitData";
import PermitCard from "../components/results/PermitCard";
import PermitDetail from "../components/results/PermitDetail";

const categories = [
  { value: "all", label: "Todos" },
  { value: "eu", label: "Comunitarios" },
  { value: "non_eu", label: "No comunitarios" },
  { value: "excepcional", label: "Circunstancias excepcionales" },
];

export default function Permisos() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPermit, setSelectedPermit] = useState(null);

  const allPermits = Object.values(PERMITS);
  const filteredPermits = activeCategory === "all"
    ? allPermits
    : allPermits.filter((p) => p.category === activeCategory);

  if (selectedPermit) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <PermitDetail permit={selectedPermit} onBack={() => setSelectedPermit(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#10103a" }}>
          Todos los permisos de residencia
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Haz clic en cualquier permiso para ver requisitos, documentación necesaria y dónde presentarla.
        </p>
      </motion.div>

     <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={activeCategory === cat.value
              ? { background: "#10103a", color: "white" }
              : { background: "rgba(16,16,58,0.06)", color: "#10103a" }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {filteredPermits.map((permit, idx) => (
          <PermitCard
            key={permit.id}
            permit={permit}
            index={idx}
            onClick={() => setSelectedPermit(permit)}
          />
        ))}
      </div>
    </div>
  );
}
