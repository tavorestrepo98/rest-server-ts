import { Request, Response, NextFunction } from 'express';


export const existeUsuarioAutenticado = (req: Request, res: Response, next: NextFunction) => {
  
    let user = req['user'];

    if(!user){
        res.status(401).json({
            message: 'Token no válido - usuario no existe'
        });
    }

    if(!user['state']){
        res.status(401).json({
            message: 'Token no válido - usuario con state false'
        });
    }

    next();

}