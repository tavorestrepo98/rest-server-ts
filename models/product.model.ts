import { Schema, model } from 'mongoose';

interface IProduct {
    name: string;
    state: boolean;
    user: Schema.Types.ObjectId;
    price: number,
    category: Schema.Types.ObjectId,
    description: string,
    disponible: boolean
}

interface IProductDoc extends IProduct, Document {}

const ProductSchemaFields: Record<keyof IProduct, any> = {
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
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    }
};

const ProductSchema: Schema<IProductDoc> = new Schema(ProductSchemaFields);

ProductSchema.methods.toJSON = function(){
    const { __v, ...Product } = this.toObject();

    return {
        ...Product
    };
};

export const Product = model('Product', ProductSchema);

