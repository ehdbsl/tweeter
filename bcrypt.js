import * as bcrypt from "bcrypt";
// npm i bcrypt

const password = 'abcd1234';
const hashed = bcrypt.hashSync(password, 10);
console.log(`password: ${password}, hashed: ${hashed}`);

// abcd1234
// $2b$10$sdz0kkyGaAb70SvamJA0Pu9I/HHaG3x3KUsL5RmfhQmIdxNywcgBO

const result = bcrypt.compareSync('abcd1234', hashed);
console.log(result);
// 암호화된 암호의 해시값을 비교 -> 같으니 true 출력
