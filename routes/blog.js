const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const User = require('../models/user');
const Blog = require('../models/blog');
const { respondMsg } = require('../utils/response');
const router = express.Router();

//新增笔记 
router.post('/addBlog', (req, res) => {
    let obj = req.body;
    let userID = mongoose.Types.ObjectId(obj.userID);
    //是否有此用户
    User.findOne({_id: userID})
        .then(user => {
            //存在此用户
            if(user) {
                Blog.create({
                    userID: userID,
                    title: obj.title,
                    content: obj.content,
                    kind: obj.kind,
                    labels: obj.labels,
                }).then(resObj => {
                    respondMsg(res, 0, '成功添加博客');
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

//获取用户的所有博客
router.post('/getBlogs', (req, res) => {
    let obj = req.body;
    let userID = mongoose.Types.ObjectId(obj.userID);
    User.findOne({_id: userID})
        .then(user => {
            if(user) {
                Blog.find({userID: userID}).sort({updated: 1})
                    .then(blogs => {
                        let data = [];
                        blogs.forEach(item => {
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

//获取所有用户的所有笔记
router.get('/getAllBlogs', (req, res) => {
    Blog.find({}).then(blogs => {
        let data = [];
        blogs.forEach(item => {
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
    }).catch(err => {
        respondMsg(res, 1, '查询失败');
        console.log(err);
    })
})

module.exports = router;