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

export const deleteUsers = (req: Request, res: Response) => {
    res.send('Hola mundo');
};