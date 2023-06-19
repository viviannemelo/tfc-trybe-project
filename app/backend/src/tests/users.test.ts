import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';

import { Response } from 'superagent';
import { user } from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /login', () => {
    beforeEach(function() { sinon.restore(); });

    describe('Casos de sucesso', () => {
        it('Deve retornar json contendo informação do usuário', async () => {
            const httpRequestBody = user;
            const httpResponse = (await chai.request(app).get('/login'));

            expect(httpResponse.body).to.be.equal(httpRequestBody);
        });
        it('Deve retornar status 200', async () => {
            const httpResponse = (await chai.request(app).get('/login'));
            expect(httpResponse.status).to.equal(200);
        });
    });

    describe('Casos de falha', () => {
        it('Caso usuário não exista deve retornar mensagem de erro', async () => {
            const httpResponse = (await chai.request(app).get('/login'));
            expect(httpResponse.body).to.equal({ message: 'Usuário não existe'});
        });
    });
});
