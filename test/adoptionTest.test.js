import mongoose from 'mongoose';
import request from 'supertest';
import { expect } from 'chai';


import app from '../src/server.js';
import userModel from '../src/models/user.js';
import petModel from '../src/models/pet.js';
import adoptionModel from '../src/models/adoption.js';

describe('Tests de endpoints adopciones', () => {
    let userId;
    let petId;
    let adoptionId;

    before(async () => {
        await mongoose.connect("mongodb+srv://emitraverso:@cluster0.pnkqvqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        const user = await userModel.create({ name: 'Test User', email: 'testuser@example.com', pets: [] });
        userId = user._id.toString();

        const pet = await petModel.create({ name: 'Test Pet', adopted: false });
        petId = pet._id.toString();
    });

    after(async () => {
        await adoptionModel.deleteMany({});
        await userModel.deleteMany({});
        await petModel.deleteMany({});
        await mongoose.connection.close();
    });

    it('Crear una adopción', async () => {
        const res = await request(app)
            .post(`/api/adoptions/${userId}/${petId}`)
            .send();

        expect(res.status).to.equal(201);
        adoptionId = res.body.payload._id;
    });

    it('Obtener la lista de adopciones', async () => {
        const res = await request(app)
            .get('/api/adoptions');

        expect(res.status).to.equal(200);
        expect(res.body.payload).to.be.an('array');
    });

    it('Obtener una adopción específica', async () => {
        const res = await request(app)
            .get(`/api/adoptions/${adoptionId}`);

        expect(res.status).to.equal(200);
        expect(res.body.payload._id).to.equal(adoptionId);
    });
});
