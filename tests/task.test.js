import request from 'supertest';
import { app } from '../server.js';
import mongoose from 'mongoose';
import { expect } from "chai";


let token;
let taskId;

before(async () => {
    const res = await request(app).post('/api/auth/register').send({
        name: 'Task User',
        email: 'task@example.com',
        password: 'password123',
    });
    const loginRes = await request(app).post('/api/auth/login').send({
        email: 'task@example.com',
        password: 'password123',
    });
    token = loginRes.body.token;
});

after(async () => {
    await mongoose.connection.close();
});

it('Create Task', async () => {
    const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'New Task' });

    expect(res.status).to.equal(201);
    expect(res.body.title).to.equal('New Task');
    taskId = res.body._id;
});

it('Get Tasks', async () => {
    const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.length).greaterThan(0);
});

it('Update Task', async () => {
    const res = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ completed: true });

    expect(res.status).to.equal(200);
    expect(res.body.completed).to.equal(true);
});

it('Delete Task', async () => {
    const res = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Task deleted successfully');
});
