const request = require('supertest');
const app = require('../app');

jest.mock('../services/gruposService');
const gruposService = require('../services/gruposService');

describe('API de Grupos', () => {
  afterEach(() => jest.resetAllMocks());

  test('GET /api/grupos devuelve lista', async () => {
    const newGrupos = [{ _id: '1', nombre: 'Grupo 1' }];
    gruposService.obtenerGrupos.mockResolvedValue(newGrupos);
    const res = await request(app).get('/api/grupos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(newGrupos);
  });

  test('POST /api/grupos crea grupo', async () => {
    const newGrupos = { _id: '2', nombre: 'Grupo 2' };
    gruposService.crearGrupo.mockResolvedValue(newGrupos);
    const res = await request(app).post('/api/grupos').send({ nombre: 'Grupo 2' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(newGrupos);
  });

  test('GET /api/grupos/:id 404 si no existe', async () => {
    gruposService.obtenerGrupoPorId.mockResolvedValue(null);
    const res = await request(app).get('/api/grupos/10000');
    expect(res.statusCode).toBe(404);
  });
});

