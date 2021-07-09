import { Request, Response } from 'express';

import { subirArchivo } from '../helpers/subir-archivo.helper';


export const cargarArchivo = async (req: Request, res: Response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({
            error: true,
            message: 'No vienen archivos'
        })
        return;
    }

    if (!req.files.archivo) {
        res.status(400).json({
            error: true,
            message: 'No viene el archivo'
        })
        return;
    }

    try{
        const pathArchivo = await subirArchivo(req.files)
        res.json({
            error: false,
            pathArchivo
        });
    }catch(err){
        res.json({
            error: true,
            message: err
        });
    }


    

}