import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProgressBar } from "./ProgressBar";
import { CategoryContent } from "./CategoryContent";
import { ActionButton } from "./actionButton";
import CarList from "./CarList";
import "../styles/categoryProgress.css"; 
import { useEffect , useLayoutEffect } from "react";

export function CategoryProgress({ categories = [] }) {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  // Convertimos el ID de la URL a número entero para obtener el índice
  const currentCategoryIndex = parseInt(categoryId, 10) - 1;
  const currentCategory = categories[currentCategoryIndex];

  const [selectedCarId, setSelectedCarId] = useState(null);

  const totalSteps = categories.length;
  const currentStep = currentCategoryIndex + 1;
  const isLastStep = currentStep === totalSteps;

useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  
  if (!currentCategory) {
    return <h2 style={{ textAlign: "center", padding: "40px 0" }}>Categoría no encontrada</h2>;
  }

  const handleNext = () => {
  
    if (!selectedCarId) return;

    setSelectedCarId(null); // Resetea la selección para la siguiente categoría

    if (isLastStep) {
      alert("Votación finalizada con éxito");
      navigate("/categoria/1"); // O a la ruta que quieras al terminar
      return;
    }

    // Navega a la siguiente categoría actualizando la URL
    navigate(`/categoria/${currentStep + 1}`);
  };

  return (
    <main className="voting-container">
      {/* 1. Barra de progreso */}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {/* 2. Contenido de la categoría */}
      <CategoryContent category={currentCategory} />

      {/* 3. Lista de autos */}
      <CarList 
        selectedCarId={selectedCarId} 
        onSelectCar={setSelectedCarId} 
      />

      {/* 4. Botón deshabilitado si no hay selección */}
      <ActionButton 
        isLastStep={isLastStep} 
        onClick={handleNext} 
        disabled={!selectedCarId} 
      />
    </main>
  );
}

export default CategoryProgress;