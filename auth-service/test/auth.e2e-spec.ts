import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestAppModule } from './app.module.test';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/auth/register (POST) - should register a new user', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
        expect(typeof res.body.access_token).toBe('string');
      });
  });

  it('/auth/login (POST) - should login a user', () => {
    // First register the user
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'login@example.com',
        username: 'loginuser',
        password: 'password123',
      })
      .then(() => {
        // Then try to login
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'login@example.com',
            password: 'password123',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body).toHaveProperty('access_token');
            expect(typeof res.body.access_token).toBe('string');
          });
      });
  });

  it('/profile (GET) - should return user profile with valid token', () => {
    // First register the user
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'profile@example.com',
        username: 'profileuser',
        password: 'password123',
      })
      .then((registerRes) => {
        const token = registerRes.body.access_token;
        
        // Then try to access protected profile endpoint
        return request(app.getHttpServer())
          .get('/profile')
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.message).toBe('This is your profile');
            expect(res.body.user).toHaveProperty('email');
            expect(res.body.user.email).toBe('profile@example.com');
          });
      });
  });
});