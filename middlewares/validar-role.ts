import { Request, Response, NextFunction } from 'express';

export const roleUserValidator = (req: Request, res: Response, next: NextFunction) => {

    let user = req['user'];
    
    if(!user){
        res.status(500).json({
            message: 'Se quiere verificar role sin validar el token primero'
        });
  
    }

    if(user['role'] !== 'admin'){
        res.status(401).json({
            message: `${user['name']} no es administrador - no puede hacer esto`
        });
    }

    next();

}