import { Router } from 'express';
import userModel from '../models/user.js';
import petModel from '../models/pet.js';
import adoptionModel from '../models/adoption.js'; 

const adoptionsRouter = Router();

// Listar todas las adopciones
adoptionsRouter.get('/', async (req, res) => {
    try {
        const adoptions = await adoptionModel.find().populate('owner pet');
        res.status(200).json({ status: 'success', payload: adoptions });
    } catch (e) {
        res.status(500).json({ status: 'error', message: 'Error al obtener las adopciones', error: e.message });
    }
});

// Obtener una adopción por ID
adoptionsRouter.get('/:aid', async (req, res) => {
    try {
        const adoption = await adoptionModel.findById(req.params.aid).populate('owner pet');
        if (!adoption) return res.status(404).json({ status: 'error', message: 'Adopción no encontrada' });
        res.status(200).json({ status: 'success', payload: adoption });
    } catch (e) {
        res.status(500).json({ status: 'error', message: 'Error al buscar la adopción', error: e.message });
    }
});

// Crear una adopción
adoptionsRouter.post('/:uid/:pid', async (req, res) => {
    try {
        const { uid, pid } = req.params;

        const user = await userModel.findById(uid);
        if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });

        const pet = await petModel.findById(pid);
        if (!pet) return res.status(404).json({ status: 'error', message: 'Mascota no encontrada' });

        if (pet.adopted) return res.status(400).json({ status: 'error', message: 'La mascota ya fue adoptada' });

        // Actualizar referencias
        user.pets.push(pet._id);
        await user.save();

        pet.adopted = true;
        pet.owner = user._id;
        await pet.save();

        const newAdoption = await adoptionModel.create({ owner: user._id, pet: pet._id });

        res.status(201).json({ status: 'success', message: 'Mascota adoptada', payload: newAdoption });
    } catch (e) {
        res.status(500).json({ status: 'error', message: 'Error al crear la adopción', error: e.message });
    }
});

export default adoptionsRouter;