import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import userRoutes from '../routes/user.routes';

interface Path {
    users: string
}

class Server {

    private app: Application;
    private port: string;
    private path: Path;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.path = {
            users: '/api/users'
        };

        this.middlewares();
        this.routes();
        this.listen();
    }

    middlewares(){
        this.app.use(cors({ origin: true }))
    }

    routes(){
        this.app.use(this.path.users, userRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Listen port ', this.port);
        })
    }



}

export default Server;