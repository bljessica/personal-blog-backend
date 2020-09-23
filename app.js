const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/dbcon')
const user = require('./routes/user')
const app = express();

app.use(bodyParser.json());//解析json数据格式
app.use(bodyParser.urlencoded({extended: false}));//解析表单数据

//连接数据库
db.connect();

//挂载路由
app.use('/user', user);


app.listen(3000, () => {
    console.log('服务器运行在localhost:3000');
})

// const httpServer = http.createServer(app);

// httpServer.listen(3000, () => {
//     console.log('服务器运行在localhost:3000');
// })