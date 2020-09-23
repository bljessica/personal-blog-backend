const express = require('express');
const router = express.Router();
const md5 = require('md5');
const User = require('../models/user');
const { respondMsg } = require('../utils/response');

// router.get('/', (req, res) => {
//     res.send(JSON.stringify({code: 0}));
// })

//存储用户
router.post('/addUser', (req, res) => {
    let obj = req.body;
    User.findOne({phone: obj.phone})
        .then(user => {
            if(user) {
                respondMsg(res, 1, '该手机号已被注册');
                return;
            }
            else {
                User.create({phone: obj.phone, nickname: obj.nickname, password: md5(obj.password)})
                    .then(resObj => {
                        respondMsg(res, 0, '注册成功');
                        return;
                    })
                    .catch(err => {
                        respondMsg(res, 1, '注册失败');
                        console.log(err);
                        return;
                    })
            }
        })
        .catch(err => {
            respondMsg(res, 1, '注册失败');
            console.log(err);
            return;
        })
})

//获取用户信息
router.get('/getUser', (req, res) => {
    let obj = req.query;
    User.findOne({phone: obj.phone})
        .then(user => {
            if(user) {
                respondMsg(res, 0, '查询成功', {
                    nickname: user.nickname,
                    avatarUrl: user.avatarUrl
                });
            }
            else {
                respondMsg(res, 1, '用户不存在');
            }
        })
        .catch(err => {
            respondMsg(res, 1, '查询失败');
            console.log(err);
            return;
        })
})

module.exports = router;