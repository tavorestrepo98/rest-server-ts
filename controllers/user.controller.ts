import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';

import { User } from '../models/user.model';

export const getUsers = (req: Request, res: Response) => {
    res.send('Hola mundo');
};

export const postUsers = async (req: Request, res: Response) => {

    

    const {name, email, password, role} = req.body;
    const user = new User({
        name, 
        email, 
        password,
        role
    });
    

    //Verificar si el email existe
    const existeEmail = await User.findOne({email});

    if(existeEmail){
        return res.status(400).json({
            message: 'Este correo ya está registrado'
        });
    }


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

export const putUsers = (req: Request, res: Response) => {

    const id = req.params.id;
    const query = req.query;

    res.status(200).json({
        message: 'Put-user',
        id,
        query
    });
};

export const deleteUsers = (req: Request, res: Response) => {
    res.send('Hola mundo');
};