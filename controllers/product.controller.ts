import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';

import { Product } from '../models';

interface IQueryProducts {
    state: boolean
}

export const getProducts = async (req: Request, res: Response) => {
    
    const { limit = 5, offset=0 } = req.query;

    const query: FilterQuery<IQueryProducts> = {
        state: true
    };
    
    try {

        const [total, categories] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query).populate({})
            .skip(Number(offset))
            .limit(Number(limit))
            .populate('user')
            .populate('category')
        ]);
        
        res.status(200).json({
            total,
            categories
        });
    } catch (error) {
        
    }



}

export const getProduct = async (req: Request, res: Response) => {
    
    const { id } = req.params;

    try {
        
        const product = await Product.findById(id)
        .populate('user')
        .populate('category');

        res.status(200).json({
            error: false,
            product
        });

    }catch(err){
        res.status(400).json({
            error: true,
            message: err
        });
    }


}

export const createProduct = async(req: Request, res: Response) => {
    
    const { state, user, ...body } = req.body;

    const productDB = await Product.findOne({ name: body.name });

    if(productDB){
        return res.status(400).json({
            error: true,
            message: `El producto ${body.name} ya existe`
        });
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req['uid']
    };


    const product = new Product(data);

    try {
        const newProduct = await product.save();

        res.status(201).json({
            error: false,
            newProduct
        });
    } catch (err) {
        res.status(400).json({
            error: true,
            message: err
        });
    }

}

export const updateProducts = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    if(data.name){
        data.name = data.name.toUpperCase();
    }

    data.user = req['id'];

    try {
        const product = await Product.findById(id, data, {
            new: true
        });
        res.status(200).json({
            error: false,
            product
        });
    } catch (err) {
        res.status(400).json({
            error: true,
            message: err
        });
    } 

}

export const deleteProducts = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const productDeleted = await Product.findByIdAndUpdate(id, {
            state: false
        }, { new: true });
        res.status(200).json({
            error: false,
            productDeleted
        });
    } catch (err) {
        res.status(400).json({
            error: true,
            message: err
        });
    } 
}
