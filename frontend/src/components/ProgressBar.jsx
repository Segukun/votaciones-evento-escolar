import "./progressBar.css";

export function ProgressBar({ currentStep, totalSteps }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <section className="progress-section" aria-label="Progreso de la votación">
      <div className="progress-header">
        <span className="progress-category">
          CATEGORÍA {currentStep} DE {totalSteps}
        </span>
        <span className="progress-percentage">{percentage}% Completado</span>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </section>
  );
}