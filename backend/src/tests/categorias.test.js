const request = require('supertest');
const app = require('../app');

jest.mock('../services/categoriasService');
const categoriasService = require('../services/categoriasService');

describe('API de Categorías', () => {
  afterEach(() => jest.resetAllMocks());

  test('GET /api/health devuelve mensaje', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ mensaje: 'El servidor funciona correctamente.' });
  });

  test('GET /api/categorias devuelve lista', async () => {
    const newCategorias = [{ _id: '1', nombre: 'Primaria' }];
    categoriasService.obtenerCategorias.mockResolvedValue(newCategorias);
    const res = await request(app).get('/api/categorias');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(newCategorias);
  });

  test('POST /api/categorias crea categoría', async () => {
    const newCategorias = { _id: '2', nombre: 'Secundaria' };
    categoriasService.crearCategoria.mockResolvedValue(newCategorias);
    const res = await request(app).post('/api/categorias').send({ nombre: 'Secundaria' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(newCategorias);
  });

  test('GET /api/categorias/:id 404 si no existe', async () => {
    categoriasService.obtenerCategoriaPorId.mockResolvedValue(null);
    const res = await request(app).get('/api/categorias/10000');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ mensaje: 'Categoría no encontrada' });
  });
});
