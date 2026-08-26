import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActionButton } from "./actionButton";
import CarList from "./CarList";
import { CategoryContent } from "./CategoryContent";
import { ProgressBar } from "./ProgressBar";
import "../styles/categoryProgress.css";
import { useEffect, useLayoutEffect } from "react";
import { useVotacion } from "../hooks/useVotacion";

export function CategoryProgress({ categories = [] }) {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const currentCategory = categories.find((cat) => cat._id === categoryId);
  const currentCategoryIndex = categories.findIndex(
    (cat) => cat._id === categoryId,
  );

  const {
    selectedCarId,
    seleccionarAuto,
    resetSeleccion,
    confirmarVoto,
    enviando,
    error,
  } = useVotacion();

  const totalSteps = categories.length;
  const currentStep = currentCategoryIndex + 1;
  const isLastStep = currentStep === totalSteps;

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!currentCategory) {
    return (
      <h2 style={{ textAlign: "center", padding: "40px 0" }}>
        Categoría no encontrada
      </h2>
    );
  }

  const handleNext = async () => {
    if (!selectedCarId) return;
    const ok = await confirmarVoto(categoryId);
    if (!ok) return; // si falla, no avanza y muestra error

    resetSeleccion();

    if (isLastStep) {
      alert("Votación finalizada con éxito");
      navigate(`/categoria/${categories[0]._id}`);
      return;
    }
    const nextCategory = categories[currentCategoryIndex + 1];
    navigate(`/categoria/${nextCategory._id}`);
  };

  return (
    <main className="voting-container">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <CategoryContent category={currentCategory} />
      <CarList selectedCarId={selectedCarId} onSelectCar={seleccionarAuto} />
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <ActionButton
        isLastStep={isLastStep}
        onClick={handleNext}
        disabled={!selectedCarId || enviando}
      />
    </main>
  );
}

export default CategoryProgress;
