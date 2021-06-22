import jwt from 'jsonwebtoken';

export const generarJWT = (uid: string = ''): Promise<any> => {
    return new Promise((res, rej) => {
        const payload = {uid};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                rej('No se pudo generar el token');
            }else{
                res(token);
            }
        })
    })
}