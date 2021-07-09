import { UploadedFile } from 'express-fileupload';
import path from 'path';

import { v4 as uuidv4 } from 'uuid';

export const subirArchivo = (files, extensionesValidas: string[] = ['png', 'jpg', 'jpeg', 'gif'], carpeta='') => {

    return new Promise((resolve, reject) => {

        const archivo: UploadedFile = files.archivo as UploadedFile;

        const nombreCortado: string[] = archivo.name.split('.');

        const extension = nombreCortado[nombreCortado.length -1];

        if(!extensionesValidas.includes(extension)){
            return reject(`La extensión ${extension} es inválida`);
        }

        const nombreTemporal = uuidv4()+'.'+extension; 

        const uploadPath = path.join(__dirname, '../uploads/' + carpeta + nombreTemporal); 


        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            return resolve(uploadPath);
        });

    });

    

    

}