import { compare, hash } from "bcrypt"

export const hashPassword = async(password: string) => {
    const hashedPassword =  await hash(password, 12)
    return hashedPassword
}

export const comparePasswords = async(password:string, hashedPassword: string) => {
    const areTheSame = await compare(password, hashedPassword);
    return areTheSame
}