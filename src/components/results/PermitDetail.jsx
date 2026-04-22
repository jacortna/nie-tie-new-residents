import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Calendar, Clock, Euro,
  CheckCircle2, ListOrdered, Lightbulb, FileText,
  MapPin, FolderOpen
} from "lucide-react";

function SectionBlock({ icon: Icon, title, color, children }) {
  const colors = {
    blue: { header: "bg-[#1a3fd4] text-white", body: "bg-blue-50 border-blue-200" },
    gold: { header: "bg-[#C9A800] text-white", body: "bg-amber-50 border-amber-200" },
    green: { header: "bg-emerald-600 text-white", body: "bg-emerald-50 border-emerald-200" },
    indigo: { header: "bg-indigo-600 text-white", body: "bg-indigo-50 border-indigo-200" },
  };
  const c = colors[color] || colors.blue;
  return (
    <div className="rounded-2xl overflow-hidden border border-border/40 shadow-sm mb-8">
      <div className={`${c.header} flex items-center gap-3 px-6 py-4`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <h2 className="font-heading text-lg font-bold">{title}</h2>
      </div>
      <div className={`${c.body} px-6 py-5`}>
        {children}
      </div>
    </div>
  );
}

export default function PermitDetail({ permit, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#1a3fd4] hover:text-[#1a3fd4]/70 mb-6 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Volver a resultados</span>
      </button>

      <Badge className={`${permit.badgeColor} border-0 text-xs font-semibold mb-4`}>
        {permit.badge}
      </Badge>

      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1a3fd4] mb-3 leading-tight">
        {permit.title}
      </h1>

      <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-3xl">
        {permit.description}
      </p>

      {/* Quick info cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: Calendar, label: "Duración", value: permit.duration },
          { icon: Euro, label: "Coste (tasa)", value: permit.cost.replace('Tasa aproximada: ', '').replace('Tasa: ', '') },
          { icon: Clock, label: "Plazo de resolución", value: permit.timeline },
        ].map((info, idx) => (
          <div key={idx} className="bg-white rounded-xl border-2 border-[#C9A800]/30 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <info.icon className="w-4 h-4 text-[#C9A800]" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{info.label}</span>
            </div>
            <p className="text-sm font-bold text-[#1a3fd4]">{info.value}</p>
          </div>
        ))}
      </div>

      {/* Requirements */}
      <SectionBlock icon={CheckCircle2} title="Requisitos que debes cumplir" color="blue">
        <ul className="space-y-3">
          {permit.requirements.map((req, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#1a3fd4] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">{idx + 1}</span>
              </div>
              <span className="text-sm text-gray-700 leading-relaxed">{req}</span>
            </li>
          ))}
        </ul>
      </SectionBlock>

      {/* Documents */}
      {permit.documents && permit.documents.length > 0 && (
        <SectionBlock icon={FolderOpen} title="Documentación que debes presentar" color="gold">
          <ul className="space-y-3">
            {permit.documents.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-[#C9A800] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 leading-relaxed">{doc}</span>
              </li>
            ))}
          </ul>
        </SectionBlock>
      )}

      {/* Where to present */}
      {permit.where_to_apply && (
        <SectionBlock icon={MapPin} title="Dónde y cómo presentarlo" color="green">
          <div className="space-y-4">
            {permit.where_to_apply.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">{idx + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">{item.place}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Steps */}
      <SectionBlock icon={ListOrdered} title="Pasos a seguir" color="indigo">
        <ol className="space-y-4">
          {permit.steps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">{idx + 1}</span>
              </div>
              <span className="text-sm text-gray-700 leading-relaxed pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </SectionBlock>

      {/* Tips */}
      {permit.tips && permit.tips.length > 0 && (
        <div className="rounded-2xl overflow-hidden border border-[#C9A800]/40 shadow-sm mb-8">
          <div className="bg-[#C9A800] flex items-center gap-3 px-6 py-4">
            <Lightbulb className="w-5 h-5 text-white flex-shrink-0" />
            <h2 className="font-heading text-lg font-bold text-white">Consejos útiles</h2>
          </div>
          <div className="bg-amber-50 px-6 py-5">
            <ul className="space-y-3">
              {permit.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-[#C9A800] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="bg-[#1a3fd4]/5 rounded-xl p-5 border border-[#1a3fd4]/20">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-[#1a3fd4]">Aviso legal:</strong> Esta información es orientativa y se basa en la normativa vigente a abril 2025. La legislación puede cambiar. Recomendamos consultar con un profesional de extranjería para tu caso concreto.
        </p>
      </div>
    </motion.div>
  );
}