import { Router } from "express";
import { faker } from "@faker-js/faker";
import { createHash } from "../utils/bcrypt.js";
import userModel from "../models/user.js";
import petModel from "../models/pet.js";
import createCustomError from "../errors/customError.js";
import errorDictionary from "../errors/errorsDictionary.js";


const mocksRouter = Router()

//Endpoints GET para la generaciòn de pets y users

mocksRouter.get('/mockingpets', async (req, res) => {
    try {
        const pets = []
        for (let i = 0; i < 10; i++) {
            pets.push({
                _id: faker.database.mongodbObjectId(),
                name: faker.person.firstName(),
                species: faker.animal.type(),
                age: faker.number.int({ min: 1, max: 15 }),
                adopted: false,
                owner: null
            })
        }
        console.log(pets);
        res.status(200).json({ message: "Mascotas generadas correctamente", payload: pets })

    } catch (e) {
        // Si hay un error en la generación de una mascota, usamos el diccionario de errores
        const customError = createCustomError(
            errorDictionary.PET_CREATION_ERROR.code,
            errorDictionary.PET_CREATION_ERROR.message
        );
        return res.status(500).json({ message: customError.message, error: customError });
    }
})

mocksRouter.get('/mockingusers', async (req, res) => {
    try {
        const numUsers = parseInt(process.argv[2]);
        if (isNaN(numUsers) || numUsers <= 0) {
            return res.status(400).json({ message: "Por favor ingrese un número válido mayor a 0." });
        }
        console.log("Process arguments:", process.argv);

        const users = []
        for (let i = 0; i < numUsers; i++) {
            users.push({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: createHash("coder123"),
                age: faker.number.int({ min: 18, max: 100 }),
                rol: Math.random() < 0.90 ? "Usuario" : "Admin",
                pets: []
            })
        }
        console.log(users);
        res.status(200).json({ message: "Usuarios generados correctamente", payload: users })

    } catch (e) {
        res.status(500).send(e)
    }
})

// Endpoint POST para Generar e Insertar Datos en la Base de Datos

mocksRouter.post('/generateData', async (req, res) => {
    try {
        // Obtengo los parámetros users y pets del body, default = 10
        const { users = 10, pets = 10 } = req.body;

        const createdUsers = [];
        const createdPets = [];
        for (let i = 0; i < users; i++) {
            try {
                const newUser = new userModel({
                    first_name: faker.person.firstName(),
                    last_name: faker.person.lastName(),
                    email: faker.internet.email(),
                    password: createHash("coder123"),
                    age: faker.number.int({ min: 18, max: 100 }),
                    rol: Math.random() < 0.90 ? "Usuario" : "Admin",
                    pets: []
                });
                const savedUser = await newUser.save();
                createdUsers.push(savedUser);
            } catch (error) {
                const customError = createCustomError(
                    errorDictionary.USER_CREATION_ERROR.code,
                    errorDictionary.USER_CREATION_ERROR.message
                );
                return res.status(500).json({ message: customError.message, error: customError });
            }
        }
        for (let i = 0; i < pets; i++) {
            try {
                const newPet = new petModel({
                    name: faker.person.firstName(),
                    species: faker.animal.type(),
                    age: faker.number.int({ min: 1, max: 15 }),
                    adopted: false,
                    owner: null
                });
                const savedPet = await newPet.save();
                createdPets.push(savedPet);
            } catch (error) {
                const customError = createCustomError(
                    errorDictionary.PET_CREATION_ERROR.code,
                    errorDictionary.PET_CREATION_ERROR.message
                );
                return res.status(500).json({ message: customError.message, error: customError });
            }
        }
        res.status(201).json({
            message: 'Datos generados y guardados correctamente',
            users: createdUsers,
            pets: createdPets
        })

    } catch (e) {
        const customError = createCustomError(
            errorDictionary.UNKNOWN_ERROR.code,
            errorDictionary.UNKNOWN_ERROR.message
        );
        res.status(500).json({ message: "Hubo un error al generar los datos", error: customError });
    }
})


// Endpoints GET para leer desde la base de datos

mocksRouter.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: e.message });
    }
});

mocksRouter.get('/pets', async (req, res) => {
    try {
        const pets = await petModel.find();
        res.status(200).json(pets);
    } catch (e) {
        res.status(500).json({ message: 'Error al obtener las mascotas', error: e.message });
    }
});

export default mocksRouter