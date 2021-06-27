import { Request, Response } from 'express';
import path from 'path';
import { UploadedFile } from 'express-fileupload';


export const cargarArchivo = (req: Request, res: Response) => {

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

    console.log('req.files >>>', req.files); // eslint-disable-line

    const archivo: UploadedFile = req.files.archivo as UploadedFile;

    const uploadPath = path.join(__dirname, '../uploads/' + archivo.name); 

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: err
            });
        }

        res.json({
            message: 'El archivo se subió al path ', uploadPath
        })
    });

}