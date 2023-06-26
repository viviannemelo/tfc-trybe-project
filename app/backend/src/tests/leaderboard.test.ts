import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { leaderboardHome } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /leaderboard/home', () => {
    beforeEach(function() { sinon.restore(); });

    describe('Casos de sucesso', () => {
    it('Deve retornar json contendo informações de todos os placares', async () => {
        const { body } = await chai.request(app).get('/leaderboard/home');
        expect(body).to.deep.equal(leaderboardHome);
    })
    });
});