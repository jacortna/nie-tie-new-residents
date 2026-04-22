import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PERMITS } from "../lib/permitData";
import PermitCard from "../components/results/PermitCard";
import PermitDetail from "../components/results/PermitDetail";

const categories = [
  { value: "all", label: "Todos" },
  { value: "eu", label: "Comunitarios" },
  { value: "non_eu", label: "No comunitarios" },
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
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1a3fd4] mb-3">
          Todos los permisos de residencia
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Haz clic en cualquier permiso para ver requisitos, documentación necesaria y dónde presentarla.
        </p>
      </motion.div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
        <TabsList className="bg-gray-100">
          {categories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value} className="font-semibold data-[state=active]:bg-[#1a3fd4] data-[state=active]:text-white">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

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