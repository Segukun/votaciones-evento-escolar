# Sistema de Votaciones – Evento Escolar

Proyecto desarrollado por alumnos de **7.º Programación** para implementar un sistema web de votaciones durante un evento de la escuela.

## Descripción

La aplicación permitirá que los asistentes al evento puedan acceder mediante un código QR y visualizar los diferentes grupos participantes junto con información básica sobre cada proyecto.

Cada grupo podrá contar con una ficha donde se muestre, entre otros datos:

* Nombre del grupo o proyecto.
* Integrantes.
* Imagen del auto o proyecto.
* Breve descripción.
* Historia o explicación de cómo fue desarrollado.

Además, los visitantes podrán votar a los grupos participantes en diferentes categorías.

Algunas categorías consideradas inicialmente son:

* Favorito del público.
* Auto más lindo.
* Auto más colorido.

Las categorías definitivas serán establecidas posteriormente por los organizadores del evento.

## Sistema de votación

Cada categoría tendrá su propia votación.

Esto permitirá que una persona pueda, por ejemplo, elegir a un grupo como su favorito y seleccionar a otro grupo en una categoría diferente.

Los votos serán almacenados en una base de datos y procesados por el backend de la aplicación.

También se implementará un mecanismo para reducir la posibilidad de realizar múltiples votaciones desde un mismo usuario o dispositivo.

## Leaderboard

La aplicación contará con una sección de resultados donde se podrán visualizar los grupos ordenados según la cantidad de votos recibidos.

Cada categoría tendrá su propio ranking.

Los resultados deberán poder actualizarse durante el evento para reflejar los nuevos votos registrados.

## Flujo general

```text
Código QR
    ↓
Aplicación web
    ↓
Visualización de grupos
    ↓
Información de cada proyecto
    ↓
Votación por categorías
    ↓
Registro de votos
    ↓
Leaderboard / resultados
```

## Tecnologías

Las tecnologías definitivas todavía se encuentran en evaluación.

Como propuesta inicial se considera utilizar:

* **Frontend:** aplicación web responsive.
* **Backend:** Node.js + Express.js.
* **Base de datos:** MongoDB.
* **Hosting frontend:** Netlify u otra plataforma similar.
* **Hosting backend:** a definir.

## Objetivo

Desarrollar una aplicación sencilla, accesible y fácil de utilizar desde dispositivos móviles, que permita a los asistentes participar de manera interactiva en el evento y reconocer a los diferentes grupos en múltiples categorías.

## Estado del proyecto

🚧 **En desarrollo**

Fecha prevista de entrega: **27 de agosto de 2026**.
