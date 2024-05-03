import express from 'express';
import { body } from 'express-validator';
import * as authRepository from '../data/auth.js';
import * as authController from '../controller/auth.js';
import { validate } from '../middleware/validator.js';
import {isAuth} from '../middleware/auth.js'

const router = express.Router();

const validateLogin = [
    body('username').trim().notEmpty().withMessage('username을 입력하세요'),
    body('password').trim().isLength({min:4}).withMessage('password는 최소 4자 이상 입력하세요'),
]

const validateSignup = [
    ... validateLogin,
    body('name').trim().notEmpty().withMessage('name을 입력하세요'),
    body('email').isEmail().withMessage('이메일 형식 확인하세요'),
    body('url').isURL().withMessage('URL형식 확인하세요'), validate
]
router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateLogin,authController.login);

router.get('/me', isAuth, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await authRepository.findById(userId);
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
        // 사용자 프로필 정보를 응답으로 보냅니다.
        res.status(200).json(user);
    } catch (error) {
        console.error('사용자 프로필 정보 조회 중 오류:', error);
        // 오류가 발생하면 클라이언트에게 오류 메시지를 보냅니다.
        res.status(500).json({ message: '서버 오류 발생', error: error.message });
    }
});


export default router;