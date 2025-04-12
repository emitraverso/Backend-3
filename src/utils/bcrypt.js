import { hashSync, genSaltSync } from "bcrypt";

//Encriptar una contraseña
export const createHash = (password) => hashSync(password, genSaltSync(4))