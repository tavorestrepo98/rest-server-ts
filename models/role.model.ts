import { Schema, model } from 'mongoose';

interface IRole {
    role: string
}

interface IRoleDoc extends IRole, Document {}

const RoleSchemaFields: Record<keyof IRole, any> = {
    role: {
        type: String,
        required: true
    }
};

const RoleSchema: Schema<IRoleDoc> = new Schema(RoleSchemaFields);

export const Role = model('Role', RoleSchema);

