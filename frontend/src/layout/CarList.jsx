import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import '../styles/CarList.css';

const API_URL = "http://localhost:3000";

export default function CarList({ categoryId }) {
  const [grupos, setGrupos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/grupos`)
      .then((res) => res.json())
      .then((data) => {
        // Filtramos por categoría si tu backend devuelve el ID de categoría en cada grupo
        const filtrados = categoryId 
          ? data.filter((grupo) => grupo.categoria === categoryId || grupo.categoriaId === categoryId)
          : data;
        setGrupos(filtrados);
      })
      .catch((err) => console.error("Error al obtener grupos:", err));
  }, [categoryId]);

  return (
    <div className="car-list-grid">
      {grupos.map((grupo) => (
        <Cards
          key={grupo._id || grupo.id}
          car={{
            id: grupo._id || grupo.id,
            name: grupo.nombre,
            madeBy: grupo.integrantes || grupo.realizadoPor || "Grupo",
            description: grupo.descripcion,
            // Agrega el puerto backend a la ruta estática de la imagen
            image: grupo.imagen?.startsWith('http') 
              ? grupo.imagen 
              : `${API_URL}${grupo.imagen}`
          }}
          isSelected={selectedId === (grupo._id || grupo.id)}
          onSelect={() => setSelectedId(grupo._id || grupo.id)}
        />
      ))}
    </div>
  );
}