const request = require('supertest');
const app = require('../app');

jest.mock('../services/votosService');
const votosService = require('../services/votosService');

describe('API de Votos', () => {
    afterEach(() => jest.resetAllMocks());


    test('POST /api/votos registra un nuevo voto', async () => {
        const newVoto = { _id: '1', grupoId: 'g1', categoriaId: 'c1' };
        votosService.registrarVoto.mockResolvedValue(newVoto);

        const res = await request(app)
            .post('/api/votos')
            .send({ grupoId: 'g1', categoriaId: 'c1' });

            expect(res.statusCode).toBe(201);
        });

    test('GET /api/votos/leaderboard devuelve ranking general', async () => {
        const leaderboard = [{ _id: '1', votos: 5 }, { _id: '2', votos: 3 }];
        votosService.obtenerLeaderboard.mockResolvedValue(leaderboard);

        const res = await request(app).get('/api/votos/leaderboard');
        expect(res.statusCode).toBe(200);
    });

    test('GET /api/votos/leaderboard/:categoriaId devuelve ranking por categoría', async () => {
    const leaderboardCategoria = [{ _id: '1', votos: 2 }];
    votosService.obtenerLeaderboardPorCategoria.mockResolvedValue(leaderboardCategoria);

    const res = await request(app).get('/api/votos/leaderboard/c1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(leaderboardCategoria);
  });

 test('GET /api/votos/verificar devuelve si el dispositivo ya voto', async () => {
    votosService.verificarVotoExistente.mockResolvedValue(true);

    const res = await request(app).get('/api/votos/verificar').query({
      categoriaId: 'c1',
      identificadorDispositivo: 'dispositivo1'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ yaVoto: true });
  });
})