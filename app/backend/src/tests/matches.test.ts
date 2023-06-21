import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchModel';

import { Response } from 'superagent';
import { allMatches } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /matches', () => {
    beforeEach(function() { sinon.restore(); });

    describe('Casos de sucesso', () => {
        it('Deve retornar json contendo todas as partidas', async () => {
            const httpRequestBody = allMatches;
            const httpResponse = (await chai.request(app).get('/matches'));

            expect(httpResponse.body).to.be.equal(httpRequestBody);
        });
        it('Deve retornar status 200', async () => {
            const httpResponse = (await chai.request(app).get('/matches'));
            expect(httpResponse.status).to.equal(200);
        });
    });

    describe('Casos de falha', () => {
        it('Caso usuário não exista deve retornar mensagem de erro', async () => {
            const httpResponse = (await chai.request(app).get('/matches'));
            expect(httpResponse.body).to.equal({ message: 'Usuário não existe'});
        });
    });
});
