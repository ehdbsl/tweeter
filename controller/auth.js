import * as authRepository from '../data/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "../config.js";

// const secretKey = "abcd1234%^&*";
// const jwtExpiresInDays = '2d';
// const bcryptSaltRounds = 10;



function createJwtToken(id){
    return jwt.sign({id}, config.jwt.secretKey, {expiresIn: config.jwt.expiresInSec});
}
export async function signup(req, res, next){
    const {username, password, name, email, url} = req.body;
    const found = await authRepository.findByUsername(username);
    if(found){
        return res.status(409).json({message:`${username}이 이미 있습니다`});
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await authRepository.createUser({username, hashed, name, email, url});
    const token = createJwtToken(userId);
    res.status(201).json({token, username});
}
export async function login(req, res, next){
    const {username, password} = req.body;
    const user = await authRepository.login(username);
    if(user){
        if(bcrypt.compareSync(password, user.password)){
            const token = createJwtToken(user.id);
            res.status(201).json({ token, message: `${username} 로그인 완료` });
        }else{
            res.status(404).json({ message: `${username}님 아이디 또는 비밀번호 확인하세요` });
        }
    }else{
        res.status(404).json({ message: `${username}님 아이디 또는 비밀번호 확인하세요` });
    }
}
export async function verify(req, res, next){
    const token = req.headers['token'];
    if(token){
        res.status(200).json(token);
    }
}