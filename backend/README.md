# Backend

Backend del sistema web de votaciones para el evento escolar.

Esta sección contendrá la lógica del servidor, el manejo de los votos, las categorías, los grupos participantes y la conexión con la base de datos.

## Estructura inicial

```text
backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── gruposController.js
│   │   ├── categoriasController.js
│   │   └── votosController.js
│   │
│   ├── models/
│   │   ├── Grupo.js
│   │   ├── Categoria.js
│   │   └── Voto.js
│   │
│   ├── routes/
│   │   ├── gruposRoutes.js
│   │   ├── categoriasRoutes.js
│   │   └── votosRoutes.js
│   │
│   └── app.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Tecnologías previstas

* Node.js
* Express.js
* MongoDB
* Mongoose

La estructura y las funcionalidades podrán modificarse a medida que avance el desarrollo del proyecto.
