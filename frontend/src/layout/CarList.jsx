import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import "../styles/CarList.css";

const API_URL = "http://localhost:3000";

export default function CarList({ categoryId, selectedCarId, onSelectCar }) {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/grupos`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setGrupos(data);
      })
      .catch((err) => console.error("Error al obtener grupos:", err));
  }, [categoryId]);

  return (
    <div className="car-list-grid">
      {grupos.map((grupo) => (
        <Cards
          key={grupo._id || grupo.id}
          car={{
            id: grupo._id,
            name: grupo.nombre,
            madeBy: grupo.integrantes || grupo.realizadoPor || "Grupo",
            description: grupo.descripcion,
            image: grupo.imagen?.startsWith("http://localhost:3000")
              ? grupo.imagen
              : `${API_URL}/${grupo.imagen}`,
          }}
          isSelected={selectedCarId === (grupo._id || grupo.id)}
          onSelect={() => onSelectCar(grupo._id || grupo.id)}
        />
      ))}
    </div>
  );
}
