import { User, Role, Category, Product } from '../models';


export const roleValidator = async (role = '') => {
    const existRole = await Role.findOne({role});
    if(!existRole){
        throw new Error(`El role ${role} no está en la BD`);
    }
}

export const emailValidator = async (email = '') => {
    const existEmail = await User.findOne({email});

    if(existEmail){
        throw new Error(`El email ${email} ya existe`);
    }
}

export const existUserValidator = async (id = '') => {
    const existUser = await User.findById(id);

    if(!existUser){
        throw new Error(`El usuario con id ${id} no existe en la BD`);
    }
}

export const existUserValidatorByEmail = async (email = '') => {
    
    const existUser = await User.findOne({
        email,
        state: true
    });

    console.log(existUser);

    if(!existUser){
        throw new Error(`El usuario con el email ${email} no existe en la BD`);
    }
}

export const existUserValidatorByIdAndState = async (id = '') => {
    const existUser = await User.findOne({
        _id: id,
        state: true
    });

    if(!existUser){
        throw new Error(`El usuario con el id ${id} no existe o no está activo`);
    }

}

export const existCategory = async(id = '') => {

    const existCategory = await Category.findOne({
        _id: id,
        state: true
    });

    if(!existCategory){
        throw new Error(`La categoria con el id ${id} no existe o no está activo`);
    }

}

export const existProduct = async(id = '') => {

    const existProduct = await Product.findOne({
        _id: id,
        state: true
    });

    if(!existProduct){
        throw new Error(`El producto con el id ${id} no existe o no está activo`);
    }

}

