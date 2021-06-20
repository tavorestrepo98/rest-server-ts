import { Role } from '../models/role.model';

export const roleValidator = async (role = '') => {
    const existRole = await Role.findOne({role});
    if(!existRole){
        throw new Error(`El role ${role} no está en la BD`);
    }
}