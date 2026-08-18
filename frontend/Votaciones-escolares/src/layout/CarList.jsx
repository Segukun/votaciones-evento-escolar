import React, { useState } from 'react'
import Cards from './Cards'
import '../styles/CarList.css'

const MOCK_CARS = [
  {
    id: 1,
    name: 'Súper Trueno EV',
    madeBy: '4to Año Electromecánica',
    description: 'Vehículo aerodinámico impulsado por energía solar. Chasis de fibra de vidrio y alerones ajustables.',
    image: '/images/super-trueno.jpg'
  },
  {
    id: 2,
    name: 'Escarabajo Retro',
    madeBy: '5to Año Automotriz',
    description: 'Inspiración clásica con un giro ecológico moderno. Cuerpo pulido de chapa reciclada y llantas de competición.',
    image: '/images/escarabajo-retro.jpg'
  },
  {
    id: 3,
    name: 'Flecha de Plata',
    madeBy: '6to Año Técnico',
    description: 'Un tributo moderno a las leyendas del Gran Premio. Estructura tubular ultraligera y cabina futurista.',
    image: '/images/flecha-plata.jpg'
  }
]

export default function CarList() {
  const [selectedCarId, setSelectedCarId] = useState(1)

  return (
    <div className="cards-grid">
      {MOCK_CARS.map((car) => (
        <Cards
          key={car.id}
          car={car}
          isSelected={selectedCarId === car.id}
          onSelect={() => setSelectedCarId(car.id)}
        />
      ))}
    </div>
  )
}