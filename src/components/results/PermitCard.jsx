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
      className="bg-white rounded-2xl border-2 border-[#1a3fd4]/15 p-6 hover:border-[#C9A800]/60 hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <Badge className={`${permit.badgeColor} border-0 text-xs font-semibold`}>
          {permit.badge}
        </Badge>
        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#C9A800] group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>

      <h3 className="font-heading text-xl font-bold text-[#1a3fd4] leading-tight mb-3">
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

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-[#1a3fd4] group-hover:text-[#C9A800] transition-colors">
        <FileText className="w-3.5 h-3.5" />
        <span className="text-xs font-semibold">Ver requisitos, documentación y dónde presentarlo →</span>
      </div>
    </motion.div>
  );
}