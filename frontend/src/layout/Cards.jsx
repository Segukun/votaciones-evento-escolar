import React from 'react'
import '../styles/Card.css'

export default function Cards({ car, isSelected, onSelect }) {
  if (!car) return null

  return (
    <article className={`car-card ${isSelected ? 'selected' : ''}`}>
      <div className="car-card-image">
        <img src={car.image} alt={car.name} />
        {isSelected && <span className="chosen-badge">✓ ELEGIDO</span>}
      </div>

      <div className="car-card-body">
        <h3 className="car-name">{car.name}</h3>
        <p className="car-author">
          <span className="made-by">Realizado por: </span>
          <strong className="author-name">{car.madeBy}</strong>
        </p>
        <p className="car-description">{car.description}</p>

        {isSelected ? (
          <button className="vote-btn selected-btn" disabled>
            <span className="radio-icon filled">◉</span>
            Seleccionado
          </button>
        ) : (
          <button className="vote-btn action-btn" onClick={onSelect}>
            <span className="radio-icon outline">○</span>
            Votar este auto
          </button>
        )}
      </div>
    </article>
  )
}