import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Loader2 } from "lucide-react";
import { QUESTIONS, PERMITS, getRecommendedPermits } from "../lib/permitData";
import QuestionCard from "../components/wizard/QuestionCard";
import PermitCard from "../components/results/PermitCard";
import PermitDetail from "../components/results/PermitDetail";
import { base44 } from "@/api/base44Client";

export default function Consulta() {
  const location = useLocation();
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  useEffect(() => {
    const situacion = location.state?.situacion;
    if (!situacion) return;

    setAiLoading(true);
    setAiError(null);

    base44.integrations.Core.InvokeLLM({
      prompt: `Eres un experto en permisos de residencia en España. El usuario ha descrito su situación en texto libre. Debes analizar su texto y devolver un JSON con las respuestas al cuestionario de la app.

Situación del usuario: "${situacion}"

Las posibles respuestas son:
- nationality_type: "eu" | "non_eu"
- eu_situation (solo si eu): "work" | "study" | "enough_resources" | "family" | "long_term"
- non_eu_situation (solo si non_eu): "no_visa" | "tourist" | "irregular" | "has_permit" | "family_eu" | "family_spanish" | "exceptional"
- exceptional_type (solo si non_eu_situation="exceptional"): "asylum" | "trata" | "violencia_genero" | "colaboracion" | "humanitarias" | "ucrania"
- non_eu_purpose (solo si non_eu_situation="no_visa"): "work_employee" | "work_self" | "study" | "digital_nomad" | "family_reunification" | "investor"
- irregular_time (solo si non_eu_situation="irregular"): "less_1" | "1_to_3" | "more_3"
- permit_type_held (solo si non_eu_situation="has_permit"): "renew" | "modify" | "long_term" | "nationality"
- tourist_purpose (solo si non_eu_situation="tourist"): "stay_work" | "stay_study" | "stay_family"

REGLAS IMPORTANTES para detectar circunstancias excepcionales (non_eu_situation="exceptional"):
- Si menciona violencia de género, maltrato, abuso, pareja que le maltrata/amenaza/agrede → exceptional_type="violencia_genero"
- Si menciona trata de personas, explotación, trafficking → exceptional_type="trata"
- Si menciona asilo, refugio, persecución, huir de su país por guerra o peligro → exceptional_type="asylum"
- Si menciona Ucrania, desplazado por la guerra de Ucrania → exceptional_type="ucrania"
- Si menciona razones médicas graves, enfermedad sin tratamiento en su país, vulnerabilidad extrema → exceptional_type="humanitarias"
- Si menciona colaboración con policía, denuncia de redes criminales → exceptional_type="colaboracion"
Estas situaciones siempre tienen prioridad sobre otras interpretaciones.

Devuelve SOLO el JSON con las claves relevantes según la situación, sin texto adicional.`,
      response_json_schema: {
        type: "object",
        properties: {
        nationality_type: { type: "string" },
        eu_situation: { type: "string" },
        non_eu_situation: { type: "string" },
        non_eu_purpose: { type: "string" },
        irregular_time: { type: "string" },
        permit_type_held: { type: "string" },
        tourist_purpose: { type: "string" },
        exceptional_type: { type: "string" },
        }
      }
    }).then((result) => {
      // Filter out null/undefined values
      const cleaned = Object.fromEntries(
        Object.entries(result).filter(([, v]) => v != null)
      );
      setAnswers(cleaned);
      setAiLoading(false);
    }).catch(() => {
      setAiError("No pudimos analizar tu situación automáticamente. Por favor, responde las preguntas manualmente.");
      setAiLoading(false);
    });
  }, []);

  // Get the current visible questions based on answers
  const visibleQuestions = useMemo(() => {
    return QUESTIONS.filter((q) => {
      if (!q.condition) return true;
      return Object.entries(q.condition).every(
        ([key, value]) => answers[key] === value
      );
    });
  }, [answers]);

  // Current question index is based on how many visible questions have been answered
  const answeredVisible = visibleQuestions.filter((q) => answers[q.id] !== undefined);
  const currentQuestion = visibleQuestions.find((q) => answers[q.id] === undefined);
  const isComplete = !currentQuestion;

  const recommendedPermitIds = isComplete ? getRecommendedPermits(answers) : [];
  const recommendedPermits = recommendedPermitIds.map((id) => PERMITS[id]).filter(Boolean);

  const handleSelect = (questionId, value) => {
    setHistory((prev) => [...prev, { ...answers }]);
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      // Clear downstream answers that may no longer be relevant
      const currentIdx = QUESTIONS.findIndex((q) => q.id === questionId);
      QUESTIONS.slice(currentIdx + 1).forEach((q) => {
        delete next[q.id];
      });
      return next;
    });
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setAnswers(prev);
      setHistory((h) => h.slice(0, -1));
    }
  };

  const handleReset = () => {
    setAnswers({});
    setHistory([]);
    setSelectedPermit(null);
  };

  // AI loading state
  if (aiLoading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 flex flex-col items-center gap-4 text-center">
        <Loader2 className="w-10 h-10 text-[#C9A800] animate-spin" />
        <h2 className="text-xl font-bold text-[#1a1a2e]">Analizando tu situación...</h2>
        <p className="text-gray-500 text-sm">Estamos buscando los permisos que mejor se adaptan a ti.</p>
      </div>
    );
  }

  // If viewing a permit detail
  if (selectedPermit) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <PermitDetail permit={selectedPermit} onBack={() => setSelectedPermit(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 min-h-[80vh]">
      {aiError && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
          {aiError}
        </div>
      )}
      {/* Back / Reset controls */}
      <div className="flex items-center justify-between mb-6">
        {history.length > 0 && !isComplete ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#1a3fd4] hover:text-[#1a3fd4]/70 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Anterior</span>
          </button>
        ) : (
          <div />
        )}
        {Object.keys(answers).length > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm font-medium">Empezar de nuevo</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isComplete && currentQuestion ? (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            onSelect={handleSelect}
            currentStep={answeredVisible.length}
            totalSteps={visibleQuestions.length}
          />
        ) : (
          <div key="results">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A800]/10 text-[#C9A800] rounded-full mb-4">
                <span className="text-sm font-semibold">✅ Consulta completada</span>
              </div>
              <h2 className="font-heading text-3xl font-bold mb-2" style={{ color: "#10103a" }}>
                Tus opciones de residencia
              </h2>
              <p className="text-gray-500">
                Según tu situación, estos son los permisos que podrías solicitar. Haz clic para ver requisitos, documentación y dónde presentarlos:
              </p>
            </div>

            <div className="grid gap-4">
              {recommendedPermits.map((permit, idx) => (
                <PermitCard
                  key={permit.id}
                  permit={permit}
                  index={idx}
                  onClick={() => setSelectedPermit(permit)}
                />
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button onClick={handleReset} className="rounded-xl gap-2 text-white" style={{ background: "linear-gradient(135deg, #10103a, #1a1a6e)" }}>
                <RotateCcw className="w-4 h-4" />
                Hacer otra consulta
              </Button>
              <Link to="/permisos">
                <Button variant="outline" className="rounded-xl" style={{ borderColor: "rgba(201,168,0,0.4)", color: "#10103a" }}>
                  Ver todos los permisos
                </Button>
              </Link>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}