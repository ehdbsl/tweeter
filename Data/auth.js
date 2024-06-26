import Mongoose from 'mongoose';
import {useVirtualId} from './db/database.js';


const userSchema = new Mongoose.Schema({
    username: {type: String, require: true},
    name: {type:String, require: true},
    email: {type:String, require: true},
    password: {type:String, require: true},
    url : String 
});
 


useVirtualId(userSchema);

const User = Mongoose.model('User', userSchema);

// 아이디(username) 중복검사
export async function findByUsername(username){
    return User.findOne({username});
}

// // id 중복검사
export async function findById(id){
    return User.findById(id);
}


// // id 생성
export async function createUser(user){
    return new User(user).save().then((data)=> data.id);
}


