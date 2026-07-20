import { useState, useRef, useEffect } from "react";
import { PERMITS } from "./permitData";

// ─── constants ───────────────────────────────────────────────────────────────

const CATEGORY_META = {
  eu:          { label: "Comunitario",              color: "blue"  },
  non_eu:      { label: "No comunitario",            color: "amber" },
  excepcional: { label: "Circunstancias especiales", color: "rose"  },
};
const CAT_COLORS = {
  blue:  { bg: "#e6f1fb", text: "#0c447c", border: "#b5d4f4" },
  amber: { bg: "#faeeda", text: "#633806", border: "#fac775" },
  rose:  { bg: "#fbeaf0", text: "#72243e", border: "#f4c0d1" },
};
const TAG_COLORS = {
  green:  { bg: "#e1f5ee", text: "#085041", border: "#9fe1cb" },
  amber:  { bg: "#faeeda", text: "#633806", border: "#fac775" },
  purple: { bg: "#eeedfe", text: "#3c3489", border: "#cecbf6" },
  red:    { bg: "#fcebeb", text: "#791f1f", border: "#f7c1c1" },
  blue:   { bg: "#e6f1fb", text: "#0c447c", border: "#b5d4f4" },
  gray:   { bg: "#f1efe8", text: "#5f5e5a", border: "#d3d1c7" },
};

const PERMIT_EXAMPLES = [
  { label: "Irregular 4 años",       text: "Soy mexicano, llevo 4 años en Madrid sin papeles y quiero regularizarme." },
  { label: "Ciudadana UE",           text: "Soy alemana con contrato de trabajo en Barcelona. ¿Qué necesito para residir legalmente?" },
  { label: "Familiar de español",    text: "Mi marido es español. Yo soy colombiana y quiero vivir con él en España." },
  { label: "Nómada digital",         text: "Trabajo remotamente para una empresa de EE.UU. y quiero vivir en España." },
  { label: "Asilo",                  text: "Huí de Venezuela por persecución política. Llegué a España hace dos meses." },
  { label: "Ucrania",                text: "Soy ucraniana, llegué en 2022 huyendo de la guerra. ¿Qué protección puedo pedir?" },
];

// ─── shared primitives ───────────────────────────────────────────────────────

function Tag({ children, color = "gray" }) {
  const c = TAG_COLORS[color] || TAG_COLORS.gray;
  return (
    <span style={{
      display: "inline-block", fontSize: 12, padding: "3px 10px",
      borderRadius: 6, background: c.bg, color: c.text,
      border: `0.5px solid ${c.border}`, fontWeight: 500,
    }}>
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, textTransform: "uppercase",
      letterSpacing: "0.09em", color: "#888780", marginBottom: 10,
    }}>
      {children}
    </div>
  );
}

function ContextBlock({ children }) {
  return (
    <div style={{
      background: "#f8f7f4", borderRadius: 8, padding: "14px 16px",
      marginBottom: 18, fontSize: 13, lineHeight: 1.6, color: "#5f5e5a",
    }}>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "#e8e6df", margin: "20px 0" }} />;
}

function Spinner({ label = "Analizando…" }) {
  return (
    <div style={{ textAlign: "center", padding: "2.5rem 0", color: "#888780", fontSize: 14 }}>
      <style>{`@keyframes ta-spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{ display: "inline-block", animation: "ta-spin 1s linear infinite", marginRight: 8 }}>⟳</span>
      {label}
    </div>
  );
}

function ErrorMsg({ children }) {
  return (
    <div style={{
      fontSize: 13, color: "#a32d2d", background: "#fcebeb",
      borderRadius: 8, padding: "10px 14px", marginTop: 10,
      border: "0.5px solid #f09595",
    }}>
      {children}
    </div>
  );
}

// ─── general analysis result ─────────────────────────────────────────────────

function MetricCard({ label, value, sub, barPct, barColor }) {
  return (
    <div style={{ background: "#f8f7f4", borderRadius: 8, padding: "14px 16px" }}>
      <div style={{ fontSize: 12, color: "#888780", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 600, color: "#2c2c2a" }}>{value}</div>
      {barPct !== undefined && (
        <div style={{ height: 4, borderRadius: 2, background: "#e8e6df", margin: "6px 0 4px", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 2, width: `${barPct}%`, background: barColor || "#888780", transition: "width 0.6s ease" }} />
        </div>
      )}
      {sub && <div style={{ fontSize: 12, color: "#b4b2a9", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function GeneralResults({ result }) {
  const score = parseInt(result.sentimiento_score) || 50;
  const barColor = score >= 60 ? "#1d9e75" : score <= 40 ? "#e24b4a" : "#ef9f27";

  return (
    <div>
      <Divider />

      <SectionLabel>Métricas generales</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 18 }}>
        <MetricCard label="Sentimiento" value={result.sentimiento} barPct={score} barColor={barColor} sub={result.sentimiento_descripcion} />
        <MetricCard label="Tono dominante" value={result.tono_dominante} sub={result.tono_secundario} />
        <MetricCard label="Legibilidad" value={result.legibilidad} sub={result.legibilidad_descripcion} />
        <MetricCard label="Intención" value={result.intencion_principal} sub={result.intencion_descripcion} />
      </div>

      <SectionLabel>Resumen contextual</SectionLabel>
      <ContextBlock>{result.resumen_contextual}</ContextBlock>

      {result.intenciones?.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <SectionLabel>Intenciones detectadas</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {result.intenciones.map((t, i) => <Tag key={i} color="blue">{t}</Tag>)}
          </div>
        </div>
      )}

      {result.tonos?.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <SectionLabel>Tono y registro</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {result.tonos.map((t, i) => <Tag key={i} color="amber">{t}</Tag>)}
          </div>
        </div>
      )}

      {result.entidades?.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <SectionLabel>Entidades y conceptos clave</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {result.entidades.map((t, i) => <Tag key={i} color="green">{t}</Tag>)}
          </div>
        </div>
      )}

      {result.temas?.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <SectionLabel>Temas principales</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {result.temas.map((t, i) => <Tag key={i} color="purple">{t}</Tag>)}
          </div>
        </div>
      )}

      {result.observaciones && (
        <>
          <SectionLabel>Observaciones adicionales</SectionLabel>
          <ContextBlock>{result.observaciones}</ContextBlock>
        </>
      )}
    </div>
  );
}

// ─── permit card ─────────────────────────────────────────────────────────────

function PermitCard({ match, isTop }) {
  const permit = PERMITS[match.id];
  if (!permit) return null;
  const catMeta  = CATEGORY_META[permit.category] || CATEGORY_META.non_eu;
  const catColor = CAT_COLORS[catMeta.color];
  const score    = Math.round(match.relevancia);
  const pct      = (score / 10) * 100;

  return (
    <div style={{
      background: "#fff", borderRadius: 12, padding: "16px 18px", marginBottom: 10,
      border: isTop ? "1.5px solid #378add" : "0.5px solid #e0ddd6",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 5,
          background: catColor.bg, color: catColor.text, border: `0.5px solid ${catColor.border}`,
          textTransform: "uppercase", letterSpacing: "0.05em",
        }}>
          {catMeta.label}
        </span>
        {isTop && (
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 5,
            background: "#e6f1fb", color: "#0c447c", border: "0.5px solid #b5d4f4",
          }}>
            ★ Mejor coincidencia
          </span>
        )}
        <span style={{ marginLeft: "auto", fontSize: 13, color: "#888780", fontWeight: 500 }}>{score}/10</span>
      </div>

      <div style={{ height: 3, borderRadius: 2, background: "#e8e6df", marginBottom: 10, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 2, width: `${pct}%`,
          background: score >= 7 ? "#1d9e75" : score >= 4 ? "#ef9f27" : "#e24b4a",
          transition: "width 0.5s ease",
        }} />
      </div>

      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 5, color: "#2c2c2a" }}>{permit.title}</div>
      <div style={{ fontSize: 13, color: "#5f5e5a", lineHeight: 1.55, marginBottom: 12 }}>
        {match.razon || permit.description}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {[`⏱ ${permit.timeline}`, `📅 ${permit.duration}`, `💶 ${permit.cost}`].map((chip, i) => (
          <span key={i} style={{
            fontSize: 12, padding: "3px 10px", borderRadius: 6,
            background: "#f1efe8", color: "#5f5e5a", border: "0.5px solid #d3d1c7",
          }}>
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── permit analysis result ──────────────────────────────────────────────────

function PermitResults({ result }) {
  return (
    <div>
      <Divider />

      <SectionLabel>Lectura contextual</SectionLabel>
      <ContextBlock>{result.contexto}</ContextBlock>

      {result.perfil?.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <SectionLabel>Perfil detectado</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {result.perfil.map((t, i) => <Tag key={i} color={result.perfil_colores?.[i] || "gray"}>{t}</Tag>)}
          </div>
        </div>
      )}

      {result.permisos?.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <SectionLabel>Permisos recomendados</SectionLabel>
          {result.permisos.map((m, i) => <PermitCard key={m.id} match={m} isTop={i === 0} />)}
        </div>
      )}

      {result.alertas?.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <SectionLabel>⚠ Alertas importantes</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {result.alertas.map((a, i) => <Tag key={i} color={result.alerta_colores?.[i] || "amber"}>{a}</Tag>)}
          </div>
        </div>
      )}

      {result.proximos_pasos && (
        <>
          <SectionLabel>Próximos pasos</SectionLabel>
          <ContextBlock>{result.proximos_pasos}</ContextBlock>
        </>
      )}
    </div>
  );
}

// ─── API calls ───────────────────────────────────────────────────────────────

async function callAPI(proxyUrl, apiKey, prompt) {
  const headers = { "Content-Type": "application/json" };
  if (apiKey) headers["x-api-key"] = apiKey;
  const res = await fetch(proxyUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || `HTTP ${res.status}`);
  const raw = data.content.map(b => b.text || "").join("").replace(/```json|```/g, "").trim();
  return JSON.parse(raw);
}

function buildGeneralPrompt(text) {
  return `Analiza el siguiente texto en profundidad. Responde SOLO con un objeto JSON (sin markdown ni backticks):
{
  "sentimiento": "Positivo|Negativo|Neutro|Mixto",
  "sentimiento_score": <0-100>,
  "sentimiento_descripcion": "<descripción breve>",
  "tono_dominante": "<Formal|Informal|Técnico|Persuasivo|Narrativo|Descriptivo|Argumentativo|Emocional|Irónico|Humorístico>",
  "tono_secundario": "<segunda característica>",
  "legibilidad": "Básica|Media|Avanzada|Especializada",
  "legibilidad_descripcion": "<a qué público va dirigido>",
  "intencion_principal": "<Informar|Persuadir|Narrar|Instruir|Entretener|Cuestionar|Argumentar|Emocionar>",
  "intencion_descripcion": "<qué pretende lograr>",
  "resumen_contextual": "<2-3 oraciones sobre el contexto y significado>",
  "intenciones": ["<intención 1>", "<intención 2>", "<intención 3>"],
  "tonos": ["<tono 1>", "<tono 2>", "<tono 3>"],
  "entidades": ["<entidad 1>", "...hasta 6"],
  "temas": ["<tema 1>", "...hasta 5"],
  "observaciones": "<2-3 oraciones sobre estructura, retórica, implicaciones>"
}

Texto:
"""
${text.slice(0, 3000)}
"""`;
}

function buildPermitPrompt(text) {
  return `Eres un experto en derecho de extranjería e inmigración en España. Tu tarea es identificar qué permisos de residencia se ajustan a la situación descrita, aplicando ESTRICTAMENTE los requisitos mínimos de cada permiso.

═══ REGLAS DE ELEGIBILIDAD (aplica estas antes de recomendar) ═══

SITUACIÓN IRREGULAR (sin papeles / con permiso caducado):
• arraigo_extraordinario → Estar en España ANTES del 01/01/2026, llevar al menos 5 MESES ininterrumpidos, sin antecedentes penales. ¡PLAZO hasta 30/06/2026! Cumplir AL MENOS UNO: (A) trabajo/oferta laboral, (B) unidad familiar con menores o ascendientes, (C) situación de vulnerabilidad. NO requiere años de estancia.
• arraigo_socioformativo → Mínimo 2 AÑOS de estancia + comprometerse a hacer formación profesional o curso SEPE.
• arraigo_laboral → Mínimo 2 AÑOS de estancia + relación laboral acreditada mín. 6 meses (con resolución judicial o acta de Inspección de Trabajo).
• arraigo_social → Mínimo 3 AÑOS de estancia + contrato de trabajo ≥1 año a jornada completa O informe de inserción social.
• arraigo_familiar → Ser progenitor de hijo/a con nacionalidad española menor de edad, O ser hijo/a de padre/madre español/a de origen. No requiere tiempo mínimo de estancia.
• arraigo_segunda_oportunidad → Haber tenido permiso previo en España y haberse acogido a retorno voluntario.

REGLA CLAVE: Si la persona lleva MENOS de 2 años → arraigo_extraordinario (si cumple condiciones) o arraigo_familiar. NUNCA arraigo_social (exige 3 años) ni arraigo_laboral (exige 2 años) si no se cumple el tiempo.

TURISTA / VISADO CORTO (en España legalmente, menos de 90 días):
• Si quiere quedarse y trabajar: arraigo_extraordinario (si lleva 5+ meses en total), work_employee, work_self, digital_nomad.
• Si tiene vínculos familiares: family_spanish, arraigo_familiar, family_reunification.
• Si quiere estudiar: student.

DESDE EL EXTRANJERO (quiere venir a España):
• Para trabajar con oferta: work_employee, tarjeta_azul_ue (si alta cualificación y salario ≥45.000€/año).
• Para trabajar como autónomo: work_self, visado_emprendedor (solo si proyecto innovador + calificación ENISA).
• Para trabajar en remoto: digital_nomad (relación laboral con empresa extranjera mín. 1 año + ingresos ≥200% SMI ≈2.520€/mes).
• Para invertir: golden_visa (≥2M€ deuda pública, ≥1M€ acciones/depósitos; la vía inmobiliaria fue eliminada en abril 2025).
• Para vivir sin trabajar: residencia_no_lucrativa (recursos ≥400% IPREM ≈2.400€/mes).
• Para estudiar: student.
• Para buscar empleo tras estudios en España: busqueda_empleo.

FAMILIARES:
• Familiar de ciudadano/a español/a (cónyuge, hijo/a <26 años, ascendiente): family_spanish.
• Familiar no comunitario de ciudadano UE residente en España: eu_family_card.
• Familiar de residente legal no comunitario: family_reunification (el residente debe tener permiso renovado y medios económicos).

CIUDADANOS UE/EEE/SUIZA:
• Residir >3 meses por trabajo/estudios/recursos: eu_registration.
• Llevar 5+ años residiendo legalmente: eu_permanent.

CIRCUNSTANCIAS ESPECIALES:
• Huye de persecución, guerra, riesgo grave en su país: proteccion_internacional.
• Ciudadano/a ucraniano/a desplazado/a desde 24/02/2022: proteccion_temporal.
• Víctima de trata: victima_trata.
• Víctima de violencia de género: victima_violencia_genero.
• Razones humanitarias graves (enfermedad, vulnerabilidad extrema): razones_humanitarias.
• Menor extranjero no acompañado: mena_menor_no_acompanado.
• Colabora con policía/justicia: colaboracion_autoridades.

YA TIENE PERMISO:
• Llevar 5 años de residencia legal: long_term.
• Quiere cambiar tipo de permiso: modification.
• Quiere nacionalidad: nationality (iberoamericanos: 2 años; casados con español/a: 1 año; general: 10 años).

═══ TEXTO A ANALIZAR ═══
"""
${text.slice(0, 2500)}
"""

Instrucciones:
1. Extrae los datos clave: nacionalidad, tiempo en España, situación (irregular/turista/legal/extranjero), vínculos familiares, situación laboral.
2. Aplica las reglas de elegibilidad anteriores. NO recomiendes un permiso si NO se cumplen sus requisitos mínimos.
3. Ordena los permisos de MAYOR a MENOR idoneidad. El primero debe ser el que MEJOR encaja.
4. Si hay una regularización extraordinaria activa y la persona podría acogerse, ponla primera con alerta urgente.

Responde SOLO con JSON (sin markdown ni backticks):
{
  "contexto": "<2-3 frases: situación real, tiempo en España, perfil migratorio y qué necesita>",
  "perfil": ["<tag corto 1>", "<tag corto 2>", "<tag corto 3>"],
  "perfil_colores": ["green|amber|purple|red|blue", "green|amber|purple|red|blue", "green|amber|purple|red|blue"],
  "permisos": [
    { "id": "<id exacto del permiso>", "relevancia": <1-10>, "razon": "<por qué aplica y qué requisito concreto cumple, en 1 frase>" }
  ],
  "alertas": ["<alerta importante si aplica>"],
  "alerta_colores": ["red|amber|green"],
  "proximos_pasos": "<2-3 frases concretas sobre qué debe hacer la persona>",
  "es_relevante": true
}
Máximo 4 permisos. Si el texto NO tiene relación con permisos de residencia en España: { "es_relevante": false }`;
}

// ─── main component ───────────────────────────────────────────────────────────

/**
 * TextAnalyzer
 *
 * Analizador de texto con dos modos:
 *   - "general"  → análisis de sentimiento, tono, intención, entidades y temas
 *   - "permisos" → detección de permisos de residencia en España (usa permitData.js)
 *
 * Props:
 *   apiKey?        – Anthropic API key (si no se pasa, usa el proxy sin cabecera)
 *   proxyUrl?      – URL del endpoint (default: https://api.anthropic.com/v1/messages)
 *   onResult?      – Callback con el resultado JSON de cada análisis
 *   defaultMode?   – "general" | "permisos" (default: "general")
 *   className?     – Clase CSS extra para el elemento raíz
 *   style?         – Estilos inline extra para el elemento raíz
 */
export default function TextAnalyzer({
  apiKey,
  proxyUrl = "https://api.anthropic.com/v1/messages",
  onResult,
  defaultMode = "general",
  className = "",
  style: rootStyle = {},
}) {
  const [mode, setMode]       = useState(defaultMode);
  const [text, setText]       = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState("");
  const textareaRef           = useRef(null);

  // reset result when mode or text changes
  useEffect(() => { setResult(null); setError(""); }, [mode]);

  // auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 260) + "px";
  }, [text]);

  async function analyze() {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const prompt = mode === "general"
        ? buildGeneralPrompt(text)
        : buildPermitPrompt(text);

      const parsed = await callAPI(proxyUrl, apiKey, prompt);

      if (mode === "permisos" && !parsed.es_relevante) {
        setError("El texto no parece estar relacionado con permisos de residencia en España.");
        return;
      }

      setResult(parsed);
      onResult?.(parsed);
    } catch (e) {
      setError("Error al analizar: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") analyze();
  }

  const css = `
    .ta-root * { box-sizing: border-box; }
    .ta-tabs { display: flex; gap: 0; border: 0.5px solid #d3d1c7; border-radius: 8px; overflow: hidden; margin-bottom: 16px; }
    .ta-tab {
      flex: 1; padding: 9px 14px; font-size: 13px; font-weight: 500; cursor: pointer;
      border: none; background: #f8f7f4; color: #888780; font-family: inherit; transition: all 0.12s;
    }
    .ta-tab:not(:last-child) { border-right: 0.5px solid #d3d1c7; }
    .ta-tab.active { background: #2c2c2a; color: #fff; }
    .ta-tab:not(.active):hover { background: #f1efe8; color: #5f5e5a; }
    .ta-textarea {
      width: 100%; min-height: 110px; resize: none; overflow: hidden;
      font-size: 14px; line-height: 1.6; padding: 12px 14px;
      border-radius: 10px; border: 1px solid #d3d1c7; outline: none;
      font-family: inherit; color: #2c2c2a; background: #fff; transition: border-color 0.15s;
    }
    .ta-textarea:focus { border-color: #378add; }
    .ta-textarea::placeholder { color: #b4b2a9; }
    .ta-btn {
      width: 100%; padding: 11px; font-size: 14px; font-weight: 600;
      border-radius: 8px; border: none; cursor: pointer;
      background: #2c2c2a; color: #fff; transition: opacity 0.15s, transform 0.1s;
      font-family: inherit;
    }
    .ta-btn:hover:not(:disabled) { opacity: 0.87; }
    .ta-btn:active:not(:disabled) { transform: scale(0.99); }
    .ta-btn:disabled { opacity: 0.35; cursor: not-allowed; }
    .ta-ex-btn {
      font-size: 12px; padding: 4px 10px; border-radius: 6px; cursor: pointer;
      border: 0.5px solid #d3d1c7; background: #f1efe8; color: #5f5e5a;
      transition: background 0.1s; font-family: inherit;
    }
    .ta-ex-btn:hover { background: #e8e6df; }
  `;

  const placeholder = mode === "general"
    ? "Pega o escribe aquí el texto que quieres analizar…"
    : "Describe la situación, pega una consulta de un cliente o un mensaje. El analizador detectará qué permiso de residencia en España corresponde…";

  const btnLabel = loading
    ? "Analizando…"
    : mode === "general" ? "Analizar contexto →" : "Detectar permiso →";

  return (
    <div className={`ta-root ${className}`} style={{ fontFamily: "system-ui, -apple-system, sans-serif", color: "#2c2c2a", ...rootStyle }}>
      <style>{css}</style>

      {/* mode tabs */}
      <div className="ta-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={mode === "general"}
          className={`ta-tab ${mode === "general" ? "active" : ""}`}
          onClick={() => setMode("general")}
        >
          Análisis de texto
        </button>
        <button
          role="tab"
          aria-selected={mode === "permisos"}
          className={`ta-tab ${mode === "permisos" ? "active" : ""}`}
          onClick={() => setMode("permisos")}
        >
          Permisos de residencia
        </button>
      </div>

      {/* examples (permits mode only) */}
      {mode === "permisos" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {PERMIT_EXAMPLES.map(ex => (
            <button key={ex.label} className="ta-ex-btn" onClick={() => setText(ex.text)}>
              {ex.label}
            </button>
          ))}
        </div>
      )}

      {/* textarea */}
      <textarea
        ref={textareaRef}
        className="ta-textarea"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        rows={4}
      />

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, marginTop: 4 }}>
        <span style={{ fontSize: 11, color: "#b4b2a9" }}>{text.length} caracteres · Ctrl+Enter para analizar</span>
        {mode === "permisos" && (
          <span style={{ fontSize: 11, color: "#b4b2a9" }}>{Object.keys(PERMITS).length} permisos en base de datos</span>
        )}
      </div>

      <button className="ta-btn" onClick={analyze} disabled={loading || !text.trim()}>
        {btnLabel}
      </button>

      {error && <ErrorMsg>{error}</ErrorMsg>}
      {loading && <Spinner label={mode === "general" ? "Analizando texto…" : "Detectando permiso…"} />}

      {result && !loading && (
        mode === "general"
          ? <GeneralResults result={result} />
          : <PermitResults result={result} />
      )}
    </div>
  );
}
