import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { CategoryContent } from "./CategoryContent";
import { ActionButton } from "./actionButton";
import "./categoryProgress.css";

export function CategoryProgress({ categories = [] }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const totalSteps = categories.length;
  const currentStep = currentStepIndex + 1;
  const isLastStep = currentStep === totalSteps;

  const handleNext = () => {
    if (isLastStep) {
      alert("Votación finalizada con éxito");
      return;
    }
    setCurrentStepIndex((prev) => prev + 1);
  };

  return (
    <main className="voting-container">
      {/* 1. Barra de progreso */}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {/* 2. Contenido (cambia dinámicamente) */}
      <CategoryContent category={categories[currentStepIndex]} />

      {/* 3. Botón de siguiente */}
      <ActionButton isLastStep={isLastStep} onClick={handleNext} />
    </main>
  );
}