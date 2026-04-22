import React from "react";
import { motion } from "framer-motion";
import { Clock, Euro, Calendar, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PermitCard({ permit, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="bg-card rounded-2xl border border-border/60 p-6 hover:border-secondary/40 hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <Badge className={`${permit.badgeColor} border-0 text-xs font-medium mb-3`}>
            {permit.badge}
          </Badge>
          <h3 className="font-heading text-xl font-semibold text-primary leading-tight">
            {permit.title}
          </h3>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
        {permit.description}
      </p>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-secondary" />
          <span className="text-xs text-muted-foreground truncate">{permit.duration.split('(')[0].trim()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Euro className="w-3.5 h-3.5 text-secondary" />
          <span className="text-xs text-muted-foreground truncate">{permit.cost.replace('Tasa aproximada: ', '').replace('Tasa: ', '')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-secondary" />
          <span className="text-xs text-muted-foreground truncate">{permit.timeline}</span>
        </div>
      </div>
    </motion.div>
  );
}