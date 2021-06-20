import { Role } from '../models/role.model';
import { User } from '../models/user.model';


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