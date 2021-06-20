import express, { Application } from 'express';
import cors from 'cors';

import { dbConnection } from '../db/config.db';
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