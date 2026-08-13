# Backend

Backend del sistema web de votaciones para el evento escolar. Se utilizarán Node.js, Express.js, MongoDB y Mongoose.

Por el momento, solamente están implementados el inicio del servidor en `app.js` y la conexión con MongoDB en `config/db.js`. Las demás carpetas están vacías para que el equipo pueda dividir el trabajo.

## Estructura acordada

```text
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

Responsabilidad de cada parte:

- `config/`: configuración y conexión con servicios externos, como MongoDB.
- `controllers/`: funciones que reciben una petición, realizan la operación necesaria y devuelven una respuesta.
- `models/`: esquemas y modelos de Mongoose que representan los datos de MongoDB.
- `routes/`: definición de las URL de la API y conexión de cada URL con su controlador.
- `services/`: lógica del negocio, validaciones y operaciones realizadas mediante los modelos.
- `app.js`: configuración general de Express e inicio del servidor.

## Convención de nombres

Para que el código sea uniforme y fácil de comprender, se utilizarán estas reglas:

- Todo el código y los nombres propios del proyecto estarán en español.
- Las variables y funciones usarán `camelCase`: `obtenerGrupos`, `registrarVoto`.
- Los modelos usarán singular y `PascalCase`: `Grupo.js`, `Categoria.js`, `Voto.js`.
- Los controladores usarán plural seguido de `Controller`: `gruposController.js`.
- Las rutas usarán plural seguido de `Routes`: `gruposRoutes.js`.
- Los servicios usarán plural seguido de `Service`: `gruposService.js`.
- Las URL de la API usarán minúsculas y sustantivos en plural: `/api/grupos`, `/api/categorias`, `/api/votos`.
- Los nombres deben describir claramente su función. Se evitarán abreviaciones como `grp`, `cat` o `ctrl`.

Ejemplo de archivos relacionados con un recurso:

```text
models/Grupo.js
controllers/gruposController.js
routes/gruposRoutes.js
services/gruposService.js
```

## Estilo básico del código

- Usar `const` por defecto y `let` solamente cuando el valor deba cambiar.
- Usar comillas simples y punto y coma.
- Indentar con dos espacios.
- Utilizar `async/await` para operaciones asíncronas.
- Exportar al final del archivo con `module.exports`.
- Mantener cada archivo enfocado en una única responsabilidad.
- Escribir mensajes de respuesta y errores claros en español.
- No colocar claves, contraseñas ni conexiones privadas directamente en el código; deben guardarse en `.env`.

## Flujo esperado de una petición

```text
Frontend → Route → Controller → Service → Model → MongoDB
```

Cada capa tendrá una responsabilidad concreta:

- La ruta recibe la petición y selecciona el controlador.
- El controlador obtiene los datos de `req`, llama al servicio y prepara la respuesta con `res`.
- El servicio aplica las reglas del sistema y utiliza los modelos necesarios.
- El modelo se comunica con MongoDB.

Los controladores no deben consultar modelos directamente. Los servicios no deben utilizar `req` ni `res`.

## Métodos acordados

Los siguientes nombres definen el contrato inicial del backend. Por el momento no deben crearse métodos adicionales sin conversarlo con el equipo.

### Grupos

Archivo: `controllers/gruposController.js`

| Método | Responsabilidad |
| --- | --- |
| `obtenerGrupos` | Obtener la lista completa de grupos participantes. |
| `obtenerGrupoPorId` | Obtener la información de un grupo específico. |
| `crearGrupo` | Registrar un grupo nuevo. |
| `actualizarGrupo` | Modificar la información de un grupo existente. |
| `eliminarGrupo` | Eliminar un grupo. |

Archivo: `services/gruposService.js`

| Método | Parámetros | Retorno |
| --- | --- | --- |
| `obtenerGrupos` | Ninguno | Lista de grupos. |
| `obtenerGrupoPorId` | `id` | Grupo encontrado. |
| `crearGrupo` | `datosGrupo` | Grupo creado. |
| `actualizarGrupo` | `id`, `datosGrupo` | Grupo actualizado. |
| `eliminarGrupo` | `id` | Grupo eliminado. |

Archivo: `routes/gruposRoutes.js`

| Método HTTP | Ruta | Controlador |
| --- | --- | --- |
| `GET` | `/api/grupos` | `obtenerGrupos` |
| `GET` | `/api/grupos/:id` | `obtenerGrupoPorId` |
| `POST` | `/api/grupos` | `crearGrupo` |
| `PUT` | `/api/grupos/:id` | `actualizarGrupo` |
| `DELETE` | `/api/grupos/:id` | `eliminarGrupo` |

### Categorías

Archivo: `controllers/categoriasController.js`

| Método | Responsabilidad |
| --- | --- |
| `obtenerCategorias` | Obtener todas las categorías de votación. |
| `obtenerCategoriaPorId` | Obtener una categoría específica. |
| `crearCategoria` | Registrar una categoría nueva. |
| `actualizarCategoria` | Modificar una categoría existente. |
| `eliminarCategoria` | Eliminar una categoría. |

Archivo: `services/categoriasService.js`

| Método | Parámetros | Retorno |
| --- | --- | --- |
| `obtenerCategorias` | Ninguno | Lista de categorías. |
| `obtenerCategoriaPorId` | `id` | Categoría encontrada. |
| `crearCategoria` | `datosCategoria` | Categoría creada. |
| `actualizarCategoria` | `id`, `datosCategoria` | Categoría actualizada. |
| `eliminarCategoria` | `id` | Categoría eliminada. |

Archivo: `routes/categoriasRoutes.js`

| Método HTTP | Ruta | Controlador |
| --- | --- | --- |
| `GET` | `/api/categorias` | `obtenerCategorias` |
| `GET` | `/api/categorias/:id` | `obtenerCategoriaPorId` |
| `POST` | `/api/categorias` | `crearCategoria` |
| `PUT` | `/api/categorias/:id` | `actualizarCategoria` |
| `DELETE` | `/api/categorias/:id` | `eliminarCategoria` |

### Votos

Archivo: `controllers/votosController.js`

| Método | Responsabilidad |
| --- | --- |
| `registrarVoto` | Validar y guardar el voto de un visitante. |
| `verificarVotoExistente` | Comprobar si el visitante ya votó en una categoría. |
| `obtenerLeaderboard` | Obtener los grupos ordenados por cantidad de votos. |
| `obtenerLeaderboardPorCategoria` | Obtener el ranking de una categoría específica. |

Archivo: `services/votosService.js`

| Método | Parámetros | Retorno |
| --- | --- | --- |
| `registrarVoto` | `datosVoto` | Voto creado. |
| `verificarVotoExistente` | `categoriaId`, `identificadorDispositivo` | `true` o `false`. |
| `obtenerLeaderboard` | Ninguno | Ranking general. |
| `obtenerLeaderboardPorCategoria` | `categoriaId` | Ranking de la categoría. |

Archivo: `routes/votosRoutes.js`

| Método HTTP | Ruta | Controlador |
| --- | --- | --- |
| `POST` | `/api/votos` | `registrarVoto` |
| `GET` | `/api/votos/verificar` | `verificarVotoExistente` |
| `GET` | `/api/votos/leaderboard` | `obtenerLeaderboard` |
| `GET` | `/api/votos/leaderboard/:categoriaId` | `obtenerLeaderboardPorCategoria` |

### Modelos

Los archivos `Grupo.js`, `Categoria.js` y `Voto.js` definirán los esquemas de Mongoose. Para las operaciones normales se utilizarán directamente los métodos estándar de Mongoose, sin crear nombres diferentes para la misma tarea:

| Método de Mongoose | Uso acordado |
| --- | --- |
| `find` | Obtener varios documentos. |
| `findById` | Buscar un documento mediante su identificador. |
| `create` | Crear y guardar un documento. |
| `findByIdAndUpdate` | Actualizar un documento mediante su identificador. |
| `findByIdAndDelete` | Eliminar un documento mediante su identificador. |
| `exists` | Comprobar si ya existe un documento. |
| `aggregate` | Calcular el leaderboard y agrupar votos. |

No se agregarán métodos personalizados dentro de los modelos salvo que exista una necesidad que no pueda resolverse claramente con estos métodos.

### Nombres de parámetros comunes

También se utilizarán los mismos nombres para los parámetros de las rutas y el cuerpo de las peticiones:

| Nombre | Significado |
| --- | --- |
| `id` | Identificador general de un recurso. |
| `grupoId` | Identificador de un grupo. |
| `categoriaId` | Identificador de una categoría. |
| `identificadorDispositivo` | Identificador usado para reducir votos repetidos. |

Los controladores mantendrán la firma estándar de Express:

```js
async function nombreDelMetodo(req, res, next) {
  // Implementación pendiente.
}
```

Cada método se exportará utilizando exactamente el mismo nombre con el que fue declarado.

### Diferencia entre controller y service

El controller y el service pueden compartir el nombre del método porque pertenecen a archivos diferentes. Para diferenciarlos al importarlos, se importará el módulo completo:

```js
const gruposService = require('../services/gruposService');
```

De esta manera, el controller podrá llamar a `gruposService.obtenerGrupos()` sin confundirlo con su propio método `obtenerGrupos`.

El controller solamente se ocupará de:

- Leer `req.params`, `req.query` y `req.body`.
- Llamar al método correspondiente del service.
- Definir el código HTTP y enviar la respuesta.
- Pasar errores al middleware mediante `next(error)`.

El service se ocupará de:

- Validar reglas del negocio.
- Comprobar si los datos relacionados existen.
- Evitar votos repetidos.
- Consultar o modificar datos mediante los modelos.
- Devolver el resultado al controller.

## Configuración inicial

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Copiar los valores de `.env.example` en `.env` y configurar la conexión con MongoDB.

3. Iniciar el servidor durante el desarrollo:

   ```bash
   npm run dev
   ```

4. Comprobar el servidor en `GET /api/health`.

## Trabajo pendiente para repartir

- Modelos de grupos, categorías y votos.
- Controladores para cada recurso.
- Servicios para cada recurso.
- Rutas de la API.
- Validación de datos.
- Prevención de votos repetidos.
- Cálculo y actualización del leaderboard.

Antes de agregar una nueva parte, se recomienda acordar quién será responsable de ella y respetar las convenciones de este documento.
