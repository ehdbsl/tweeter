import dotenv from 'dotenv';

dotenv.config();

function required(key,deaultValue=undefined) {
    const value = process.env[key] || deaultValue; // or: 앞의 값이 true로 판별되면 앞의 값이 대입되고 값이 false로 판별되면 뒤에 값이 대입됨
    if(value == null){
        throw new Error(`키 ${key}는 undefined~~`)
    }
    return value
}

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC',172800))
    },
    bcrypt:{
        saltRounds: parseInt(required('BYCRPT_SALT_ROUNDS',10))
    },
    host:{
        port: parseInt(required('HOST_PORT',8080))
    }
}