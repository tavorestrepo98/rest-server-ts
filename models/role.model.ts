import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
    role: {
        type: String,
        required: true
    }
});

export const Role = model('Role', RoleSchema);

