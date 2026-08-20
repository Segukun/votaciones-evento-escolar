export function ActionButton({ isLastStep, onClick }) {
  return (
    <button type="button" className="action-button" onClick={onClick}>
      <span>{isLastStep ? "Terminar votación" : "Siguiente categoría"}</span>
      <span className="button-icon">{isLastStep ? "✓" : "→"}</span>
    </button>
  );
}