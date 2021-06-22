import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../models/user.model';


export const validarJWT = async (req: Request, res: Response, next: NextFunction) => { 

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            message: 'No hay token en la petición'
        });
    }

    try {

        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        req['uid'] = payload['uid'];

        req['user'] = await User.findById(payload['uid']);

        next();
    } catch (error) {

        console.log(error);
        res.status(401).json({
            message: 'Token no válido'
        })
        
    }

}