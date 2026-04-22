import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { QUESTIONS, PERMITS, getRecommendedPermits } from "../lib/permitData";
import QuestionCard from "../components/wizard/QuestionCard";
import PermitCard from "../components/results/PermitCard";
import PermitDetail from "../components/results/PermitDetail";

export default function Consulta() {
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);
  const [selectedPermit, setSelectedPermit] = useState(null);

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
              <h2 className="font-heading text-3xl font-bold text-[#1a3fd4] mb-2">
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
              <Button onClick={handleReset} className="rounded-xl gap-2 bg-[#1a3fd4] hover:bg-[#1a3fd4]/90 text-white">
                <RotateCcw className="w-4 h-4" />
                Hacer otra consulta
              </Button>
              <Link to="/permisos">
                <Button variant="outline" className="rounded-xl border-[#1a3fd4]/30 text-[#1a3fd4]">
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