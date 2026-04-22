import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Calendar, Clock, Euro,
  CheckCircle2, ArrowRight, Lightbulb, FileText
} from "lucide-react";

export default function PermitDetail({ permit, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Volver</span>
      </button>

      <Badge className={`${permit.badgeColor} border-0 text-xs font-medium mb-4`}>
        {permit.badge}
      </Badge>

      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4 leading-tight">
        {permit.title}
      </h1>

      <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-3xl">
        {permit.description}
      </p>

      {/* Quick info */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: Calendar, label: "Duración", value: permit.duration },
          { icon: Euro, label: "Coste", value: permit.cost },
          { icon: Clock, label: "Plazo estimado", value: permit.timeline },
        ].map((info, idx) => (
          <div key={idx} className="bg-card rounded-xl border border-border/60 p-4">
            <div className="flex items-center gap-2 mb-1">
              <info.icon className="w-4 h-4 text-secondary" />
              <span className="text-xs font-medium text-muted-foreground">{info.label}</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{info.value}</p>
          </div>
        ))}
      </div>

      {/* Requirements */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="font-heading text-xl font-semibold text-primary">Requisitos</h2>
        </div>
        <div className="bg-card rounded-xl border border-border/60 p-6">
          <ul className="space-y-3">
            {permit.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground/85 leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Steps */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <ArrowRight className="w-5 h-5 text-primary" />
          <h2 className="font-heading text-xl font-semibold text-primary">Pasos a seguir</h2>
        </div>
        <div className="bg-card rounded-xl border border-border/60 p-6">
          <ol className="space-y-4">
            {permit.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">{idx + 1}</span>
                </div>
                <span className="text-sm text-foreground/85 leading-relaxed pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Tips */}
      {permit.tips && permit.tips.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-secondary" />
            <h2 className="font-heading text-xl font-semibold text-primary">Consejos útiles</h2>
          </div>
          <div className="bg-accent/50 rounded-xl border border-secondary/20 p-6">
            <ul className="space-y-3">
              {permit.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground/85 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="bg-muted/50 rounded-xl p-6 border border-border/60">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Aviso:</strong> Esta información es orientativa y se basa en la normativa vigente a abril 2025.
          La legislación puede cambiar. Recomendamos consultar con un abogado de extranjería para tu caso concreto.
        </p>
      </div>
    </motion.div>
  );
}