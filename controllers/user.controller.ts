import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
    res.send('Hola mundo');
};

export const postUsers = (req: Request, res: Response) => {
    const body = req.body;
    console.log('body: ', body);

    res.status(200).json({
        message: 'Post-users',
        body
    });
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