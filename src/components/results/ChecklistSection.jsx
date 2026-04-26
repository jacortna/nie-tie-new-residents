import React, { useState } from "react";
import { CheckSquare, Square } from "lucide-react";

export default function ChecklistSection({ title, icon: Icon, items, color }) {
  const [checked, setChecked] = useState({});

  const toggle = (idx) =>
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const done = Object.values(checked).filter(Boolean).length;

  const colorMap = {
    blue: {
      header: "bg-[#1a3fd4] text-white",
      body: "bg-blue-50 border-blue-200",
      badge: "bg-white/20",
      check: "text-white",
      item: "text-[#1a3fd4]",
    },
    gold: {
      header: "bg-[#C9A800] text-white",
      body: "bg-amber-50 border-amber-200",
      badge: "bg-white/20",
      check: "text-white",
      item: "text-[#C9A800]",
    },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="rounded-2xl overflow-hidden border border-border/40 shadow-sm mb-8">
      <div className={`${c.header} flex items-center justify-between gap-3 px-6 py-4`}>
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 flex-shrink-0" />
          <h2 className="font-heading text-lg font-bold">{title}</h2>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.badge}`}>
          {done}/{items.length}
        </span>
      </div>
      <div className={`${c.body} px-6 py-5`}>
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li
              key={idx}
              onClick={() => toggle(idx)}
              className={`flex items-start gap-3 cursor-pointer group transition-opacity ${
                checked[idx] ? "opacity-50" : "opacity-100"
              }`}
            >
              {checked[idx] ? (
                <CheckSquare className={`w-5 h-5 flex-shrink-0 mt-0.5 ${c.item}`} />
              ) : (
                <Square className={`w-5 h-5 flex-shrink-0 mt-0.5 ${c.item} group-hover:scale-110 transition-transform`} />
              )}
              <span
                className={`text-sm text-gray-700 leading-relaxed ${
                  checked[idx] ? "line-through text-gray-400" : ""
                }`}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
        {done === items.length && items.length > 0 && (
          <p className="mt-4 text-sm font-semibold text-emerald-600 flex items-center gap-2">
            ✅ ¡Todo listo en esta sección!
          </p>
        )}
      </div>
    </div>
  );
}