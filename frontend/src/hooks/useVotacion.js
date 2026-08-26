import { useCallback, useState } from "react";

const API_URL = "http://localhost:3000";

function getDeviceId() {
  let id = localStorage.getItem("identificadorDispositivo");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("identificadorDispositivo", id);
  }
  return id;
}

export function useVotacion() {
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  const seleccionarAuto = useCallback((carId) => {
    setSelectedCarId(carId);
    setError(null);
  }, []);

  const resetSeleccion = useCallback(() => {
    setSelectedCarId(null);
  }, []);

  const confirmarVoto = useCallback(
    async (categoryId) => {
      if (!selectedCarId || !categoryId) return false;
      setEnviando(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/votos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grupoId: selectedCarId,
            categoriaId: categoryId,
            identificadorDispositivo: getDeviceId(),
          }),
        });
        if (!response.ok) {
          const data = await response.json().catch(() => null);
          setError(data?.mensaje || "Error al registrar el voto");
          return false;
        }
        return true;
      } catch (err) {
        setError("Error de red al votar");
        return false;
      } finally {
        setEnviando(false);
      }
    },
    [selectedCarId],
  );

  return {
    selectedCarId,
    seleccionarAuto,
    resetSeleccion,
    confirmarVoto,
    enviando,
    error,
  };
}
