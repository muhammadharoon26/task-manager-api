import request from 'supertest';
import { app } from '../server.js';
import mongoose from 'mongoose';
import { expect } from "chai";


let token;

before(async function () {
    this.timeout(10000);
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ Connected to MongoDB");
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error);
    }
  });

before(async () => {
    const res = await request(app).post('/api/auth/register').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
    });
    const loginRes = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
    });
    token = loginRes.body.token;
});

after(async () => {
    await mongoose.connection.close();
});

it('Login User', async () => {
    const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
    });
    expect(res.status).to.equal(200);
    expect(res.body.token).to.be.a('string');
});

it('Delete User', async () => {
    const res = await request(app)
        .delete('/api/auth/delete')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('User deleted successfully');
});
