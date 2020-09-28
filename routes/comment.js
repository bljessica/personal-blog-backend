const express = require('express');
const Comment = require('../models/comment');
const router = express.Router();

router.post('/saveComment', (req, res) => {
    let obj = req.body;
    Comment.create({
        nickname: obj.nickname,
        email: obj.email,
        content: obj.content,
    }).then(() => {
        respondMsg(res, 0, '发表成功');
    }).catch(err => {
        respondMsg(res, 1, '操作失败');
        console.log(err);
        return;
    })
})