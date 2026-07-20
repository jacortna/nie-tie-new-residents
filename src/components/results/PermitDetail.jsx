import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Calendar, Clock, Euro,
  CheckCircle2, ListOrdered, Lightbulb, FileText,
  MapPin, FolderOpen, Download
} from "lucide-react";
import ChecklistSection from "./ChecklistSection";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";

// ─────────────────────────────────────────────────────────────────────────────
// AdMob — Intersticial antes de descargar el PDF
// ─────────────────────────────────────────────────────────────────────────────
const ADMOB_INTERSTITIAL_ID = "ca-app-pub-8506962897852380/8507868952";

async function showInterstitialAd() {
  try {
    if (!Capacitor.isNativePlatform()) return;
    const { AdMob } = await import("@capacitor-community/admob");
    await AdMob.initialize({ requestTrackingAuthorization: false });
    await AdMob.prepareInterstitial({ adId: ADMOB_INTERSTITIAL_ID });
    await AdMob.showInterstitial();
  } catch (e) {
    console.warn("AdMob error:", e);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Componente visual SectionBlock (sin cambios)
// ─────────────────────────────────────────────────────────────────────────────
function SectionBlock({ icon: Icon, title, color, children }) {
  const colors = {
    blue:   { header: "bg-[#1a3fd4] text-white",   body: "bg-blue-50 border-blue-200" },
    gold:   { header: "bg-[#C9A800] text-white",    body: "bg-amber-50 border-amber-200" },
    green:  { header: "bg-emerald-600 text-white",  body: "bg-emerald-50 border-emerald-200" },
    indigo: { header: "bg-indigo-600 text-white",   body: "bg-indigo-50 border-indigo-200" },
  };
  const c = colors[color] || colors.blue;
  return (
    <div className="rounded-2xl overflow-hidden border border-border/40 shadow-sm mb-8">
      <div className={`${c.header} flex items-center gap-3 px-6 py-4`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <h2 className="font-heading text-lg font-bold">{title}</h2>
      </div>
      <div className={`${c.body} px-6 py-5`}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// jsPDF con Helvetica usa codificación WinAnsi (latin-1 / ISO-8859-1).
// Eso cubre á é í ó ú ü ñ ¿ ¡ y todos los caracteres españoles.
// NO hace falta cargar ninguna fuente externa.
// El error "Cannot read properties of undefined (reading 'widths')" ocurre
// cuando se intenta usar una fuente que no se registró bien (p.ej. .woff).
// Solución: usamos SIEMPRE helvetica y convertimos el texto a latin-1.
// ─────────────────────────────────────────────────────────────────────────────

/** Convierte una cadena JS (UTF-16) a una cadena compatible con WinAnsi/latin-1.
 *  Los caracteres fuera de ese rango se sustituyen por equivalentes ASCII. */
function toWinAnsi(texto) {
  if (!texto) return "";
  // Primero saneamos tipografía "inteligente"
  texto = texto
    .replace(/[\u2018\u2019\u02BC]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u2022/g, "-")
    .replace(/\u2192/g, "->")
    .replace(/\u2190/g, "<-")
    .replace(/\u00A0/g, " ")
    .replace(/\u20AC/g, "EUR");

  // Ahora mapeamos carácter a carácter.
  // WinAnsi cubre U+0000–U+00FF más algunos extras en U+0100–U+017E.
  // Para todo lo que quede fuera hacemos una transliteración básica.
  const map = {
    "\u0100": "A", "\u0101": "a", "\u0102": "A", "\u0103": "a",
    "\u0104": "A", "\u0105": "a", "\u0106": "C", "\u0107": "c",
    "\u010C": "C", "\u010D": "c", "\u010E": "D", "\u010F": "d",
    "\u0110": "D", "\u0111": "d", "\u0112": "E", "\u0113": "e",
    "\u011A": "E", "\u011B": "e", "\u011C": "G", "\u011D": "g",
    "\u0120": "G", "\u0121": "g", "\u0122": "G", "\u0123": "g",
    "\u0124": "H", "\u0125": "h", "\u0128": "I", "\u0129": "i",
    "\u012A": "I", "\u012B": "i", "\u012E": "I", "\u012F": "i",
    "\u0130": "I", "\u0131": "i", "\u0134": "J", "\u0135": "j",
    "\u0136": "K", "\u0137": "k", "\u0139": "L", "\u013A": "l",
    "\u013D": "L", "\u013E": "l", "\u0141": "L", "\u0142": "l",
    "\u0143": "N", "\u0144": "n", "\u0147": "N", "\u0148": "n",
    "\u014C": "O", "\u014D": "o", "\u0150": "O", "\u0151": "o",
    "\u0154": "R", "\u0155": "r", "\u0158": "R", "\u0159": "r",
    "\u015A": "S", "\u015B": "s", "\u015E": "S", "\u015F": "s",
    "\u0160": "S", "\u0161": "s", "\u0162": "T", "\u0163": "t",
    "\u0164": "T", "\u0165": "t", "\u016A": "U", "\u016B": "u",
    "\u016E": "U", "\u016F": "u", "\u0170": "U", "\u0171": "u",
    "\u0172": "U", "\u0173": "u", "\u0174": "W", "\u0175": "w",
    "\u0176": "Y", "\u0177": "y", "\u0178": "Y", "\u017B": "Z",
    "\u017C": "z", "\u017D": "Z", "\u017E": "z",
  };

  return texto
    .split("")
    .map((ch) => {
      const code = ch.charCodeAt(0);
      // WinAnsi range: 0x00–0xFF está soportado directamente
      if (code <= 0x00FF) return ch;
      // Transliteración para Latin Extended-A
      if (map[ch]) return map[ch];
      // Último recurso: descomponer y quitar diacrítico
      const decomposed = ch.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return decomposed.length > 0 ? decomposed : "?";
    })
    .join("");
}

// Alias para compatibilidad con el resto del código
const sanearTexto = toWinAnsi;

// ─────────────────────────────────────────────────────────────────────────────
// Función principal de generación del PDF
// ─────────────────────────────────────────────────────────────────────────────
async function generatePDF(permit, setDownloading) {
  try {
    setDownloading(true);
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pageW = 210;
    const margin = 14;
    const contentW = pageW - margin * 2;
    let y = 0;

    const setFont = (style) => doc.setFont("helvetica", style);

    // Colores
    const navy  = [13, 27, 62];
    const gold  = [201, 168, 0];
    const dark  = [30, 30, 50];
    const gray  = [110, 110, 130];
    const light = [248, 248, 252];
    const white = [255, 255, 255];
    const line  = [220, 220, 230];

    function checkPage(needed = 10) {
      if (y + needed > 278) {
        doc.addPage();
        addPageHeader();
        y = 28;
      }
    }

    function addPageHeader() {
      doc.setFillColor(...navy);
      doc.rect(0, 0, pageW, 10, "F");
      doc.setFillColor(...gold);
      doc.rect(0, 0, pageW, 2, "F");
      doc.setFontSize(7);
      doc.setTextColor(...gold);
      setFont("bold");
      doc.text("NIE/TIE - New Residents", margin, 7);
      doc.setTextColor(180, 180, 200);
      setFont("normal");
      doc.text(sanearTexto(permit.title), pageW - margin, 7, { align: "right" });
    }

    // ── CABECERA PRIMERA PÁGINA ──────────────────────────────────────────
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageW, 42, "F");
    doc.setFillColor(...gold);
    doc.rect(0, 0, pageW, 3, "F");

    doc.setFontSize(9);
    doc.setTextColor(...gold);
    setFont("bold");
    doc.text("NIE/TIE · New Residents · Guia de Residencia en Espana", margin, 12);

    doc.setFontSize(16);
    doc.setTextColor(...white);
    setFont("bold");
    const titleLines = doc.splitTextToSize(sanearTexto(permit.title), contentW - 10);
    doc.text(titleLines, margin, 24);

    // Badge
    const badgeText = sanearTexto(permit.badge || "Permiso");
    const badgeW = badgeText.length * 2.8 + 10;
    doc.setFillColor(...gold);
    doc.roundedRect(margin, 34, badgeW, 6, 1, 1, "F");
    doc.setFontSize(6.5);
    doc.setTextColor(...navy);
    setFont("bold");
    doc.text(badgeText, margin + badgeW / 2, 38.5, { align: "center" });

    doc.setFontSize(7);
    doc.setTextColor(180, 180, 200);
    setFont("normal");
    doc.text(`Generado el ${new Date().toLocaleDateString("es-ES")}`, pageW - margin, 38.5, { align: "right" });

    y = 52;

    // ── DESCRIPCIÓN ──────────────────────────────────────────────────────
    doc.setFontSize(9.5);
    doc.setTextColor(...dark);
    setFont("normal");
    const descLines = doc.splitTextToSize(sanearTexto(permit.description), contentW);
    checkPage(descLines.length * 5.5 + 8);
    doc.text(descLines, margin, y);
    y += descLines.length * 5.5 + 10;

    // ── TARJETAS DURACIÓN / COSTE / PLAZO ────────────────────────────────
    checkPage(22);
    const cardW = (contentW - 6) / 3;
    const costVal = sanearTexto((permit.cost || "").replace("Tasa aproximada: ", "").replace("Tasa: ", ""));
    const cards = [
      { label: "DURACION",          value: sanearTexto(permit.duration  || "-") },
      { label: "COSTE (TASA)",      value: costVal || "-" },
      { label: "PLAZO RESOLUCION",  value: sanearTexto(permit.timeline  || "-") },
    ];
    cards.forEach((card, i) => {
      const x = margin + i * (cardW + 3);
      doc.setFillColor(...light);
      doc.setDrawColor(...line);
      doc.setLineWidth(0.4);
      doc.roundedRect(x, y, cardW, 18, 1.5, 1.5, "FD");
      // Franja izquierda dorada
      doc.setFillColor(...gold);
      doc.rect(x, y, 2, 18, "F");
      doc.setFontSize(6);
      doc.setTextColor(...gray);
      setFont("bold");
      doc.text(card.label, x + 6, y + 6);
      doc.setFontSize(8);
      doc.setTextColor(...navy);
      setFont("bold");
      const vLines = doc.splitTextToSize(card.value, cardW - 8);
      doc.text(vLines[0] || "", x + 6, y + 13);
    });
    y += 24;

    // ── FUNCIÓN PARA SECCIONES ───────────────────────────────────────────
    function drawSection(title, items, isChecklist = false) {
      if (!items || items.length === 0) return;

      checkPage(16);
      // Título de sección
      doc.setFillColor(...light);
      doc.setDrawColor(...line);
      doc.setLineWidth(0.4);
      doc.rect(margin, y, contentW, 9, "FD");
      doc.setFillColor(...gold);
      doc.rect(margin, y, 3, 9, "F");
      doc.setFontSize(9);
      doc.setTextColor(...navy);
      setFont("bold");
      doc.text(sanearTexto(title), margin + 8, y + 6.2);
      y += 12;

      items.forEach((item, idx) => {
        const rawText = typeof item === "string"
          ? item
          : item.place
          ? `${item.place}: ${item.detail}`
          : String(item);

        const text = sanearTexto(rawText);
        const textW = contentW - 16;
        const lines = doc.splitTextToSize(text, textW);
        const rowH = Math.max(lines.length * 5 + 7, 12);

        checkPage(rowH + 2);

        // Fondo alterno
        if (idx % 2 === 0) {
          doc.setFillColor(252, 252, 255);
          doc.rect(margin, y, contentW, rowH, "F");
        }

        // Separador inferior
        doc.setDrawColor(...line);
        doc.setLineWidth(0.2);
        doc.line(margin, y + rowH, margin + contentW, y + rowH);

        if (isChecklist) {
          // Cuadrado checkbox
          doc.setDrawColor(...gold);
          doc.setLineWidth(0.5);
          doc.rect(margin + 4, y + rowH / 2 - 2.2, 4.5, 4.5);
        } else {
          // Número en círculo
          doc.setFillColor(...navy);
          doc.circle(margin + 6.5, y + rowH / 2, 3.8, "F");
          doc.setFontSize(6.5);
          doc.setTextColor(...white);
          setFont("bold");
          doc.text(String(idx + 1), margin + 6.5, y + rowH / 2 + 2.2, { align: "center" });
        }

        doc.setFontSize(8.5);
        doc.setTextColor(...dark);
        setFont("normal");
        doc.text(lines, margin + 13, y + 5.5);
        y += rowH;
      });
      y += 8;
    }

    if (permit.requirements?.length)
      drawSection("Requisitos que debes cumplir", permit.requirements, true);

    if (permit.documents?.length)
      drawSection("Documentacion que debes presentar", permit.documents, true);

    if (permit.where_to_apply?.length)
      drawSection("Donde y como presentarlo", permit.where_to_apply, false);

    if (permit.steps?.length)
      drawSection("Pasos a seguir", permit.steps, false);

    if (permit.tips?.length)
      drawSection("Consejos utiles", permit.tips, false);

    // ── AVISO LEGAL ──────────────────────────────────────────────────────
    checkPage(18);
    doc.setFillColor(245, 245, 250);
    doc.setDrawColor(...line);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, y, contentW, 14, 1.5, 1.5, "FD");
    doc.setFontSize(7);
    doc.setTextColor(...gray);
    setFont("bold");
    doc.text("AVISO LEGAL:", margin + 4, y + 5.5);
    setFont("normal");
    const disclaimer = "Informacion orientativa basada en normativa vigente a 2026. La legislacion puede cambiar. Consulta con un profesional de extranjeria para tu caso concreto.";
    const dLines = doc.splitTextToSize(disclaimer, contentW - 8);
    doc.text(dLines, margin + 4, y + 10.5);
    y += 18;

    // ── PIE DE PÁGINA (todas las páginas) ────────────────────────────────
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFillColor(...navy);
      doc.rect(0, 287, pageW, 10, "F");
      doc.setFillColor(...gold);
      doc.rect(0, 287, pageW, 1, "F");
      doc.setFontSize(7);
      doc.setTextColor(...gold);
      setFont("bold");
      doc.text("NIE/TIE New Residents", margin, 293);
      doc.setTextColor(160, 160, 180);
      setFont("normal");
      doc.text(`Pagina ${i} de ${totalPages}`, pageW - margin, 293, { align: "right" });
    }

    // ── GUARDAR / COMPARTIR ──────────────────────────────────────────────
    const safeTitle = sanearTexto(permit.title)
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_\-]/g, "")
      .substring(0, 40);
    const fileName = `NIETIE_${safeTitle}.pdf`;
    const base64 = doc.output("datauristring").split(",")[1];

    if (Capacitor.isNativePlatform()) {
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64,
        directory: Directory.Cache,
      });
      try {
        const { Share } = await import("@capacitor/share");
        await Share.share({
          title: sanearTexto(permit.title),
          text: `Guia de residencia: ${sanearTexto(permit.title)}`,
          url: savedFile.uri,
          dialogTitle: "Abrir o compartir tu guia PDF",
        });
      } catch {
        await Filesystem.writeFile({
          path: fileName,
          data: base64,
          directory: Directory.Documents,
        });
        alert(`PDF guardado en Documentos:\n${fileName}`);
      }
    } else {
      doc.save(fileName);
    }

  } catch (err) {
    console.error("Error generando PDF:", err);
    alert("Error al generar el PDF: " + (err.message || "Error desconocido"));
  } finally {
    setDownloading(false);
  }
}
// ─────────────────────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────────────────────
export default function PermitDetail({ permit, onBack }) {
  const [downloading, setDownloading] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 transition-colors font-medium"
        style={{ color: "#C9A800" }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Volver a resultados</span>
      </button>

      <Badge className={`${permit.badgeColor} border-0 text-xs font-semibold mb-4`}>
        {permit.badge}
      </Badge>

      <h1
        className="font-heading text-3xl sm:text-4xl font-bold mb-3 leading-tight"
        style={{ color: "#10103a" }}
      >
        {permit.title}
      </h1>

      <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-3xl">
        {permit.description}
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: Calendar, label: "Duración",            value: permit.duration },
          { icon: Euro,     label: "Coste (tasa)",         value: permit.cost.replace("Tasa aproximada: ", "").replace("Tasa: ", "") },
          { icon: Clock,    label: "Plazo de resolución",  value: permit.timeline },
        ].map((info, idx) => (
          <div key={idx} className="bg-white rounded-xl border-2 border-[#C9A800]/30 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <info.icon className="w-4 h-4 text-[#C9A800]" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {info.label}
              </span>
            </div>
            <p className="text-sm font-bold text-[#1a3fd4]">{info.value}</p>
          </div>
        ))}
      </div>

      <ChecklistSection
        icon={CheckCircle2}
        title="Requisitos que debes cumplir"
        items={permit.requirements}
        color="blue"
      />

      {permit.documents?.length > 0 && (
        <ChecklistSection
          icon={FolderOpen}
          title="Documentación que debes presentar"
          items={permit.documents}
          color="gold"
        />
      )}

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

      {permit.tips?.length > 0 && (
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

      <div
        className="rounded-xl p-5 mb-8"
        style={{ background: "rgba(16,16,58,0.04)", border: "1px solid rgba(16,16,58,0.12)" }}
      >
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong style={{ color: "#10103a" }}>Aviso legal:</strong> Esta información es orientativa
          y se basa en la normativa vigente a mayo 2026. La legislación puede cambiar. Recomendamos
          consultar con un profesional de extranjería para tu caso concreto.
        </p>
      </div>

      <button
        onClick={async () => {
          await showInterstitialAd();
          generatePDF(permit, setDownloading);
        }}
        disabled={downloading}
        className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl mb-8"
        style={{
          backgroundColor: downloading ? "#555" : "#10103a",
          opacity: downloading ? 0.7 : 1,
        }}
      >
        <Download className="w-5 h-5 text-[#C9A800]" />
        <span className="text-white font-bold text-base">
          {downloading ? "Generando PDF..." : "Descargar guía en PDF"}
        </span>
        <FileText className="w-5 h-5 text-[#C9A800]" />
      </button>
    </motion.div>
  );
}
