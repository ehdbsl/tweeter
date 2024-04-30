import express from "express";
const router = express.Router();
import * as tweetContoller from '../controller/tweet.js';
import {body} from 'express-validator';
import {validate} from '../servers/Router/validator.js';

const validateTweet = [
    body('text').trim().isLength({min:3}).withMessage('최소 3자 이상입력'), validate
]
// 해당 아이디에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets?username=:username
router.get('/', tweetContoller.getTweets);
// 글번호에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets/:id
router.get('/:id', tweetContoller.getTweet);
// 트윗하기
// POST
// http://localhost:8080/tweets
// name, username, text
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post('/',validateTweet,tweetContoller.createTweet);
// 트윗 수정하기
// PUT
// http://localhost:8080/tweets/:id
// id, username, text
// json 형태로 입력 후 변경된 데이터까지 모두 json으로 출력
router.put('/:id',validateTweet,tweetContoller.updateTweet );
// 트윗 삭제하기
// DELETE
// http://localhost:8080/tweets/:id
router.delete('/:id',tweetContoller.deleteTweet );