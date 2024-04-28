import express from 'express';
import { Person } from "../models/personModel.js";

const router = express.Router();

// Route for save a new person
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.document ||
            !request.body.name ||
            !request.body.apellidoPaterno ||
            !request.body.apellidoMaterno
        ){
            return response.status(400).send({
                message: 'Send all required fields: document, name, apellido paterno, apelldo materno',
            });
        }
        const newPerson = {
            document: request.body.document,
            name: request.body.name,
            apellidoPaterno: request.body.apellidoPaterno,
            apellidoMaterno: request.body.apellidoMaterno,
        };
        const person = await Person.create(newPerson);
        return response.status(201).send(person);
    } catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all persons from database
router.get('/', async (request, response) => {
    try {
        const persons = await Person.find({});
        return response.status(200).json({
            count: persons.length,
            data: persons
        });
    } catch (error) {
        console.log(error.messsage);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get One Person from database by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const person = await Person.findById(id);
        return response.status(200).json(person);
    } catch (error) {
        console.log(error.messsage);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a Person
router.put('/:id', async (request, response) => {
    try {
        if(
            !request.body.document ||
            !request.body.name ||
            !request.body.apellidoPaterno ||
            !request.body.apellidoMaterno
        ){
            return response.status(400).send({
                message: 'Send all required fields: documento de identidad, nombre, apellido paterno y apellido materno.',
            });
        }
        const { id } = request.params;

        const result = await Person.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(400).json({ message: 'Person not found' });
        }

        return response.status(200).send({ message: 'Person updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Delete a Person
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Person.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({ message: 'Person not found' });
        }
        return response.status(200).send({ message: 'Person deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;