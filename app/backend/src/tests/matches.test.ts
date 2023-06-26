import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

const jwtPayload = {
  email: 'admin@admin.com',
  role: 'admin'
}

export const goalsUpdated = {
	homeTeamGoals: 3,
	awayTeamGoals: 1
}

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';

import { allMatches, matchesInProgress, matchInvalid, newMatch, createdMatch } from './mocks/matches.mock';
import TeamsModel from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /matches', () => {
  afterEach(() => sinon.restore())

  describe('Casos de sucessos', () => {
    it('Deve retornar json contendo informações de todos as partidas', async () => {
    const { status } = await chai.request(app).get('/matches');
    expect(status).to.be.equal(200);
    });
    it('Deve retornar partidas "In Progress"', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matchesInProgress as unknown as MatchModel[])
    const { body } = await chai.request(app).get('/matches?inProgress=true');
    expect(body).to.deep.equal(matchesInProgress);
    });
  });

  describe('Teste /matches/:id/finish', () => {
    it('Deve retornar mensagem de sucesso', async () => {
      sinon.stub(jwt, 'verify').callsFake(() => jwtPayload);
      sinon.stub(MatchModel, 'findOne').resolves(allMatches[1] as unknown as MatchModel);
      sinon.stub(MatchModel, 'update').resolves([1]);

      const response = await chai.request(app).patch('/matches/41/finish')
        .set('Authorization', 'token');

      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
    it('Deve retornar status de sucesso', async () => {
      sinon.stub(jwt, 'verify').callsFake(() => jwtPayload);
      sinon.stub(MatchModel, 'findOne').resolves(allMatches[1] as unknown as MatchModel);
      sinon.stub(MatchModel, 'update').resolves([1]);
  
      const response = await chai.request(app).patch('/matches/1')
      .set('Authorization', 'token-valid')
      .send(goalsUpdated);
  
      expect(response.status).to.be.equal(200);
    });
    describe('Teste criando Match', () => {
      it('Caso de falha', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtPayload);
        sinon.stub(TeamsModel, 'findOne').resolves(undefined);
  
        const response = await chai.request(app).post('/matches')
          .set('Authorization', 'token-valid')
          .send(matchInvalid);
  
        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!' });
      });
      it('Caso de sucesso', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtPayload);
  
        const resolved = MatchModel.build({ ...newMatch, inProgress: true })
        const resultCreatedMatch = MatchModel.build(createdMatch)
        sinon.stub(MatchModel, 'create').resolves(resolved);
        sinon.stub(MatchModel, 'findOne').resolves(resultCreatedMatch);
  
  
        const response = await chai.request(app).post('/matches')
          .set('Authorization', 'token-valid')
          .send(newMatch);

          expect(response.status).to.be.equal(201);
      });
    });
  });
});