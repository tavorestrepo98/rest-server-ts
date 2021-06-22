import express, { Application } from 'express';
import cors from 'cors';

import { dbConnection } from '../db/config.db';
import userRoutes from '../routes/user.routes';
import authRoutes from '../routes/auth.routes';

interface Path {
    users: string,
    auth: string
}

class Server {

    private app: Application;
    private port: string;
    private path: Path;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.path = {
            users: '/api/users',
            auth: '/api/auth'
        };

        //conectar a base de datos
        this.conectarDb();

        this.middlewares();
        this.routes();
        this.listen();
    }

    middlewares(){
        this.app.use(cors({ origin: true }));

        //parseo de body
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.path.users, userRoutes);
        this.app.use(this.path.auth, authRoutes);
    }

    async conectarDb(){
        await dbConnection();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Listen port ', this.port);
        })
    }



}

export default Server;