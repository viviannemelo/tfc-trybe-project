import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';

import { Response } from 'superagent';
import allTeams from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /teams', () => {
    beforeEach(function() { sinon.restore(); });

    describe('Casos de sucesso', () => {
        it('Método GET deve retornar json contendo informações de times', async () => {
            const httpRequestBody = allTeams;
            const httpResponse = (await chai.request(app).get('/teams'));

            expect(httpResponse.body).to.be.equal(httpRequestBody);
        });
        it('Método GET deve retornar status 200', async () => {
            const httpResponse = (await chai.request(app).get('/teams'));
            expect(httpResponse.status).to.equal(200);
        });
    });

    describe('Casos de falha', () => {
        it('Caso aconteça um erro ao retornar times deve retornar mensagem de erro', async () => {
            const httpResponse = (await chai.request(app).get('/teams'));
            expect(httpResponse.body).to.equal({ message: 'Não foi possível encontrar times'});
        });
    });
});
