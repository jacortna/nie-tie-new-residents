import React from "react";
import { motion } from "framer-motion";
import { Clock, Euro, Calendar, ChevronRight, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
export default function PermitCard({ permit, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      style={{ border: "1.5px solid rgba(16,16,58,0.1)" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,0,0.6)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(16,16,58,0.1)'}
    >
      <div className="flex items-start justify-between mb-3">
        <Badge className={`${permit.badgeColor} border-0 text-xs font-semibold`}>
          {permit.badge}
        </Badge>
        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#C9A800] group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
      <h3 className="font-heading text-xl font-bold leading-tight mb-3" style={{ color: "#10103a" }}>
        {permit.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
        {permit.description}
      </p>
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#C9A800]" />
            <span className="text-xs text-gray-400 font-medium">Duración</span>
          </div>
          <span className="text-xs text-gray-600 font-semibold truncate">{permit.duration.split('(')[0].trim()}</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Euro className="w-3 h-3 text-[#C9A800]" />
            <span className="text-xs text-gray-400 font-medium">Tasa</span>
          </div>
          <span className="text-xs text-gray-600 font-semibold truncate">{permit.cost.replace('Tasa aproximada: ', '').replace('Tasa: ', '')}</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#C9A800]" />
            <span className="text-xs text-gray-400 font-medium">Plazo</span>
          </div>
          <span className="text-xs text-gray-600 font-semibold truncate">{permit.timeline}</span>
        </div>
      </div>
      <div
        className="mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 group-hover:shadow-md"
        style={{ backgroundColor: "#10103a" }}
      >
        <FileText className="w-4 h-4 text-[#C9A800] flex-shrink-0" />
        <span className="text-sm font-bold text-white">Ver requisitos y documentación</span>
        <ChevronRight className="w-4 h-4 text-[#C9A800] group-hover:translate-x-1 transition-transform flex-shrink-0" />
      </div>
    </motion.div>
  );
}
