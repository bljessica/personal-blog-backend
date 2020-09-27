const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const User = require('../models/user');
const Note = require('../models/note');
const { respondMsg } = require('../utils/response');
const router = express.Router();

//新增笔记 
router.post('/addNote', (req, res) => {
    let obj = req.body;
    let userID = mongoose.Types.ObjectId(obj.userID);
    //是否有此用户
    User.findOne({_id: userID})
        .then(user => {
            //存在此用户
            if(user) {
                Note.create({
                    userID: userID,
                    title: obj.title,
                    content: obj.content,
                    kind: obj.kind,
                    labels: obj.labels,
                }).then(resObj => {
                    respondMsg(res, 0, '成功添加笔记');
                }).catch(err => {
                    respondMsg(res, 1, '查询失败');
                    console.log(err);
                })
            }
            else {
                respondMsg(res, 1, '此用户不存在');
            }
        }).catch(err => {
            respondMsg(res, 1, '查询失败');
            console.log(err);
        })
})

//获取用户的所有笔记
router.post('/getNotes', (req, res) => {
    let obj = req.body;
    let userID = mongoose.Types.ObjectId(obj.userID);
    User.findOne({_id: userID})
        .then(user => {
            if(user) {
                Note.find({userID: userID}).sort({updated: 1})
                    .then(notes => {
                        let data = [];
                        notes.forEach(item => {
                            data.push({
                                title: item.title,
                                content: item.content,
                                kind: item.kind,
                                labels: item.labels,
                                created: moment(item.created).format('YYYY-MM-DD HH:mm'),
                                updated: moment(item.updated).format('YYYY-MM-DD HH:mm')
                            })
                        });
                        respondMsg(res, 0, '查询成功', data);
                    })
            }
            else {
                respondMsg(res, 1, '此用户不存在');
            }
        }).catch(err => {
            respondMsg(res, 1, '查询失败');
            console.log(err);
        })
})
module.exports = router;