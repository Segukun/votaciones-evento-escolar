export function ActionButton({ isLastStep, onClick, disabled }) {
  return (
    <button 
      type="button" 
      className="action-button" 
      onClick={onClick}
      disabled={disabled}
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer"
      }}
    >
      <span>{isLastStep ? "Terminar votación" : "Siguiente categoría"}</span>
      <span className="button-icon">{isLastStep ? "✓" : "→"}</span>
    </button>
  );
}