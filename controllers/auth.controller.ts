import { Request, Response } from 'express';

import { User } from '../models/user.model';
import { generarJWT } from '../helpers/generarJWT.helper';

import * as bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({
            email,
            state: true
        });

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, user['password']);
        if(!validPassword){
            return res.status(500).json({
                message: 'El password es incorrecto'
            });
        }

        const token = await generarJWT(user['id']);

        res.json({
            user, 
            token
        });

    } catch (error) {
        return res.status(500).json({
            error
        })
    }

    res.json({
        message: 'login'
    });
}