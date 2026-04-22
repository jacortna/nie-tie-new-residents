import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase, GraduationCap, Wallet, Users, Home,
  Plane, MapPin, AlertTriangle, FileText, Heart,
  Rocket, Laptop, TrendingUp, Clock, RefreshCw,
  Pencil, Shield, Star, Globe, Flag
} from "lucide-react";

const iconMap = {
  briefcase: Briefcase,
  graduation: GraduationCap,
  wallet: Wallet,
  users: Users,
  home: Home,
  plane: Plane,
  map: MapPin,
  alert: AlertTriangle,
  file: FileText,
  heart: Heart,
  rocket: Rocket,
  laptop: Laptop,
  trending: TrendingUp,
  clock: Clock,
  refresh: RefreshCw,
  edit: Pencil,
  shield: Shield,
  star: Star,
  globe: Globe,
  flag: Flag,
};

export default function QuestionCard({ question, onSelect, currentStep, totalSteps }) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#C9A800] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-xs text-gray-400 font-semibold bg-gray-100 px-2 py-1 rounded-full">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>

      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1a3fd4] mb-2">
        {question.question}
      </h2>
      {question.subtitle && (
        <p className="text-gray-500 mb-8">{question.subtitle}</p>
      )}

      <div className="grid gap-3">
        {question.options.map((option, idx) => {
          const Icon = iconMap[option.icon] || Globe;
          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onSelect(question.id, option.value)}
              className="w-full flex items-start gap-4 p-5 rounded-xl border-2 border-gray-100 bg-white hover:border-[#C9A800] hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1a3fd4]/8 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A800]/15 transition-colors">
                <Icon className="w-5 h-5 text-[#1a3fd4] group-hover:text-[#C9A800] transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 group-hover:text-[#1a3fd4] transition-colors">{option.label}</p>
                {option.description && (
                  <p className="text-sm text-gray-400 mt-0.5">{option.description}</p>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}