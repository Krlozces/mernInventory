import express from "express";
import { Product } from "../models/productModel.js";

const router = express.Router();

// Route for save a new product
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.name ||
            !request.body.description ||
            !request.body.price ||
            !request.body.stockQuantity
        ){
            return response.status(400).send({
                message: 'Send all required fields: name, description, price, stock'
            });
        }
        const newProduct = {
            name: request.body.name,
            description: request.body.description,
            price: request.body.price,
            stockQuantity: request.body.stockQuantity,
        };
        const product = await Product.create(newProduct);
        return response.status(201).send(product);
    } catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all products from database
router.get('/', async (request, response) => {
    try {
        const products = await Product.find({});
        return response.status(200).json({
            count: products.length,
            data: products
        });
    } catch (error) {
        console.log(error.messsage);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get One Product from database by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const product = await Product.findById(id);
        return response.status(200).json(product);
    } catch (error) {
        console.log(error.messsage);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a Product
router.put('/:id', async (request, response) => {
    try {
        if(
            !request.body.name ||
            !request.body.description ||
            !request.body.price ||
            !request.body.stockQuantity
        ){
            return response.status(400).send({
                message: 'Send all required fields: name, price, description and stock.',
            });
        }
        const { id } = request.params;

        const result = await Product.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(400).json({ message: 'Product not found' });
        }

        return response.status(200).send({ message: 'Product updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Delete a Product
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Product.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({ message: 'Product not found' });
        }
        return response.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;