import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnection, Connection } from 'typeorm';

import { AppModule } from './../src/app.module';

describe('e2e', () => {
  let app: NestFastifyApplication;
  let connection: Connection;

  beforeAll(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = appModule.createNestApplication(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    connection = getConnection();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    const entities = connection.entityMetadatas;
    for (const entity of entities) {
      await connection.getRepository(entity.name).clear();
    }
  });

  describe('auth', () => {
    const user = {
      email: 'test@test.com',
      password: 'testTestingPassword',
    };
    it('SignUp User', async () =>
      app
        .inject()
        .post('/auth/signup')
        .body(user)
        .then((result) => {
          expect(result.statusCode).toEqual(201);
          expect(result.json()).toEqual({
            token: expect.any(String),
            user: {
              id: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              email: expect.any(String),
            },
          });
        }));

    it('SignUp User already exists', async () => {
      await app
        .inject()
        .post('/auth/signup')
        .body(user)
        .then((result) => {
          expect(result.statusCode).toEqual(201);
          expect(result.json()).toEqual({
            token: expect.any(String),
            user: {
              id: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              email: expect.any(String),
            },
          });
        });
      await app
        .inject()
        .post('/auth/signup')
        .body(user)
        .then((result) => {
          expect(result.json()).toEqual({
            statusCode: 400,
            message: 'User already exists',
          });
        });
    });
  });
});
