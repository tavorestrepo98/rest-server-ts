import { Schema, model } from 'mongoose';

interface ICategory {
    name: string;
    state: boolean;
    user: Schema.Types.ObjectId;
}

interface ICategoryDoc extends ICategory, Document {}

const CategorySchemaFields: Record<keyof ICategory, any> = {
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
};

const CategorySchema: Schema<ICategoryDoc> = new Schema(CategorySchemaFields);

CategorySchema.methods.toJSON = function(){
    const { __v, ...category } = this.toObject();

    return {
        ...category
    };
};

export const Category = model('Category', CategorySchema);

