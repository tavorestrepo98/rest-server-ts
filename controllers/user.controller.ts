import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User } from '../models/index';

interface IQueryGetUsers {
    state: boolean
}

export const getUsers = async (req: Request, res: Response) => {

    const { limite = 5, desde = 0 } = req.query;

    const query: FilterQuery<IQueryGetUsers> = {
        state: true
    };

    // const usuarios = await User.find(query)
    // .skip(Number(desde))
    // .limit(Number(limite));

    // const total = await User.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
};

export const getUser = async (req: Request, res: Response) => {

    const id = req.params.id;

    const user = await User.findById(id);

    res.status(200).json(user);

};

export const postUsers = async (req: Request, res: Response) => {

    const {name, email, password, role} = req.body;
    const user = new User({
        name, 
        email, 
        password,
        role
    });


    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    user['password'] = bcrypt.hashSync(password, salt);

    //Guardar en BD



    try {
        let usuarioCreado = await user.save();
        res.status(200).json({
            message: 'Post-users',
            newUser: usuarioCreado
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error al crear usuario',
            error
        });    
    }


};

export const putUsers = async (req: Request, res: Response) => {

    const id = req.params.id;
    const { password, google, ...payload } = req.body;

    //todo validar frente a DB
    if(password){
        const salt = bcrypt.genSaltSync(10);
        payload['password'] = bcrypt.hashSync(password, salt);
    }

    const usuario = await User.findByIdAndUpdate(id, payload);

    res.status(200).json({
        message: 'Put-user',
        usuario
    });
};

export const deleteUsers = async (req: Request, res: Response) => {

    const uid = req['uid'];

    let { id } = req.params;

    // const usuarioAutenticado = req['user'];

    // if(!usuarioAutenticado){
    //     return res.status(401).json({
    //         message: 'Token no válido - usuario no existe'
    //     });
    // }

    // //verificar si el uid tiene estado true
    // if(!usuarioAutenticado.state){
    //     return res.status(401).json({
    //         message: 'Token no válido - usuario con state false'
    //     });
    // }

    let userDeleted = await User.findByIdAndUpdate(id, {
        state: false
    }, { new: true });

    res.status(200).json({
        userDeleted
    });
};