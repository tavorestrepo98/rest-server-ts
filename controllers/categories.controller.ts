import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';

import { Category } from '../models';

interface IQueryGetCategories {
    state: boolean
}

export const getCategories = async(req: Request, res: Response) => {

    const query: FilterQuery<IQueryGetCategories> = {
        state: true
    };

    const { limit=5, offset=0 } = req.query;

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(offset))
            .limit(Number(limit))
            .populate('user', ['name', 'role', 'email'])
    ]);

    res.status(200).json({
        total,
        categories
    });

};

export const getCategory = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const category = await Category.findById(id)
        .populate('user');

        return res.status(201).json({
            error: false,
            category
        })
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: err
        })
    }
    
};

export const createCategory = async (req: Request, res: Response) => {
    const name = req.body.name.toUpperCase();
    const categoriaDB = await Category.findOne({name});

    if(categoriaDB){
        return res.status(400).json({
            error: true,
            message: `La categoría ${categoriaDB['name']} ya existe`
        });
    }

    const data = {
        name,
        user: req['uid']
    }

    const category = new Category(data);

    const newCategory = await category.save();

    console.log(data);
    res.status(201).json({
        error: false,
        newCategory
    });


};

export const putCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { estado, user, ...data } = req.body;
    
    data.name = data.name.toUpperCase();
    data.usuario = req['user']._id;

    
    try {
        
        const category = await Category.findByIdAndUpdate(id, data, { new: true });
        res.json({
            error: false,
            category
        })

    } catch (err) {

        res.json({
            error: true,
            message: err
        })
        
    }

};

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const categoriaBorrada = await Category.findByIdAndUpdate(id, {
            state: false
        });
        res.status(200).json({
            error: false,
            categoriaBorrada
        })
    } catch (err) {
        res.status(400).json({
            error: true,
            err
        })
    }
};