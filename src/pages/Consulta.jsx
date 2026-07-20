import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Loader2 } from "lucide-react";
import { QUESTIONS, PERMITS, getRecommendedPermits } from "../lib/permitData";
import QuestionCard from "../components/wizard/QuestionCard";
import PermitCard from "../components/results/PermitCard";
import PermitDetail from "../components/results/PermitDetail";
import { Capacitor } from "@capacitor/core";
import { analizarSituacion } from "../lib/analizadorTexto";

const ADMOB_INTERSTITIAL_ID = "ca-app-pub-8506962897852380/7083106644";

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

    try {
      const resultado = analizarSituacion(situacion);
      const cleaned = Object.fromEntries(
        Object.entries(resultado).filter(([, v]) => v != null)
      );
      setAnswers(cleaned);
      setAiLoading(false);
      showInterstitialAd();
    } catch (err) {
      console.error("Error analizando:", err);
      setAiError("No pudimos analizar tu situación automáticamente. Por favor, responde las preguntas manualmente.");
      setAiLoading(false);
    }
  }, [location.state?.situacion]);

  const visibleQuestions = useMemo(() => {
    return QUESTIONS.filter((q) => {
      if (!q.condition) return true;
      return Object.entries(q.condition).every(
        ([key, value]) => answers[key] === value
      );
    });
  }, [answers]);

  const answeredVisible = visibleQuestions.filter((q) => answers[q.id] !== undefined);
  const currentQuestion = visibleQuestions.find((q) => answers[q.id] === undefined);
  const isComplete = !currentQuestion;

  const recommendedPermitIds = isComplete ? getRecommendedPermits(answers) : [];
  const recommendedPermits = recommendedPermitIds.map((id) => PERMITS[id]).filter(Boolean);

  const handleSelect = async (questionId, value) => {
    setHistory((prev) => [...prev, { ...answers }]);
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      const currentIdx = QUESTIONS.findIndex((q) => q.id === questionId);
      QUESTIONS.slice(currentIdx + 1).forEach((q) => { delete next[q.id]; });
      return next;
    });

    const updatedAnswers = { ...answers, [questionId]: value };
    const updatedVisible = QUESTIONS.filter((q) => {
      if (!q.condition) return true;
      return Object.entries(q.condition).every(([key, val]) => updatedAnswers[key] === val);
    });
    const nextQuestion = updatedVisible.find((q) => updatedAnswers[q.id] === undefined);
    if (!nextQuestion) {
      await showInterstitialAd();
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      setAnswers(history[history.length - 1]);
      setHistory((h) => h.slice(0, -1));
    }
  };

  const handleReset = () => {
    setAnswers({});
    setHistory([]);
    setSelectedPermit(null);
  };

  if (aiLoading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 flex flex-col items-center gap-4 text-center">
        <Loader2 className="w-10 h-10 text-[#C9A800] animate-spin" />
        <h2 className="text-xl font-bold text-[#1a1a2e]">Analizando tu situación...</h2>
        <p className="text-gray-500 text-sm">Estamos buscando los permisos que mejor se adaptan a ti.</p>
      </div>
    );
  }

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
      <div className="flex items-center justify-between mb-6">
        {history.length > 0 && !isComplete ? (
          <button onClick={handleBack} className="flex items-center gap-2 text-[#1a3fd4] hover:text-[#1a3fd4]/70 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Anterior</span>
          </button>
        ) : <div />}
        {Object.keys(answers).length > 0 && (
          <button onClick={handleReset} className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
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
                <PermitCard key={permit.id} permit={permit} index={idx} onClick={() => setSelectedPermit(permit)} />
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
