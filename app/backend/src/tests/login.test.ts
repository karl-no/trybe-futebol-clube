import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import HTTPCodes from '../utils/HTTPCodes';

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do endpoint /login', () => {
  afterEach(sinon.restore);

  it('Login realizado com sucesso', async () => {
    const res = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(res.status).to.be.equal(200);
    expect(res.body).to.deep.equal({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc',
    });
  });

  it('Login não é realizado sem o e-mail', async () => {
    const res = await chai.request(app).post('/login').send({
      password: 'secret_admin',
    });

    expect(res.status).to.be.equal(HTTPCodes.badRequest);
    expect(res.body).to.deep.equal({ message: 'All fields must be filled' });
  });
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
