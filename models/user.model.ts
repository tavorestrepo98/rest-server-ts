import { Schema, model, Document } from 'mongoose';

interface IUser {
    name: string;
    email: string;
    password: string;
    img?: string;
    role: string;
    state?: boolean;
    google?: boolean
}

interface IUserDoc extends IUser, Document {}

const UserSchemaFields: Record<keyof IUser, any> = {
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
};

const UserSchema: Schema<IUserDoc> = new Schema(UserSchemaFields);

UserSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject();

    return user;
};

export const User = model('User', UserSchema);