import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';

import { Response } from 'superagent';
import { allTeams, team } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /teams', () => {
    beforeEach(function() { sinon.restore(); });

    describe('Casos de sucesso', () => {
        it('Deve retornar json contendo informações de todos os times', async () => {
            sinon.stub(Teams, 'findAll').resolves(allTeams as any);

            const { status, body } = await chai.request(app).get('/teams');
        
            expect(status).to.equal(200);
            expect(body).to.deep.equal(allTeams);
        });
    });
    // describe('Casos de falha', () => {
    //     it('Caso aconteça um erro ao retornar times deve retornar mensagem de erro', async () => {
    //         const httpResponse = (await chai.request(app).get('/teams'));
    //         expect(httpResponse.body).to.equal({ message: 'Não foi possível encontrar times'});
    //     });
    // });
});

describe('Teste /teams/:id', () => {
    beforeEach(function() { sinon.restore(); });

    describe('Casos de sucesso', () => {
        it('Deve retornar json contendo informação de time específico', async () => {
            sinon.stub(Teams, 'findOne').resolves(team as any);

            const { status, body } = await chai.request(app).get('/teams/5');
        
            expect(status).to.equal(200);
            expect(body).to.deep.equal(team);
        });
    });

    describe('Casos de falha', () => {
        it('Caso time não exista, deve retornar um erro', async () => {
            sinon.stub(Teams, 'findOne').resolves(null);

            const { status, body } = await chai.request(app).get('/teams/1');
        
            expect(status).to.equal(404);
            expect(body.message).to.equal('Time not found');
        });
    });
});
