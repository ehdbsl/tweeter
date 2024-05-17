import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
    // validationResult: 유효성 검사를 위해 사용 올바른 형식을 갖추고있는지 확인하는 용도
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    return res.status(400).json({ message: errors.array()[0].msg});
}