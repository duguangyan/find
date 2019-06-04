var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var FileStreamRotator = require('file-stream-rotator')
var session = require('express-session');
var moment = require('moment');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/user');
var loadRouter = require('./routes/api/load');
var classifyRouter = require('./routes/api/classify');
var taskRouter = require('./routes/api/task');
var addressRouter = require('./routes/api/address');
var captchaRouter = require('./routes/api/captcha');
var orderRouter = require('./routes/api/order');


let userHttp = require('./service/user');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  静态文件的托管，在 upload 目录下找到图片
//  访问地址 http://127.0.0.1:3000/public/upload/images/XXXXXXXXXXX.jpg
app.use('/public',express.static('public'));//将文件设置成静态
// logger   ------------start--------------
// 日志文件切割
var logDirectory = path.join(__dirname, 'log')
// 如果文件不存在就创建文件
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// 创建文件流
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})
// 日志保存在文件
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
// app.use(logger('short', {stream: accessLogStream}));
// 自定义token
logger.token('from', function(req, res){
    return "token:"+req.headers.token;
});
logger.token('time', function(req, res){
    let nowTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    return "["+nowTime+"]";
});
logger.token('nextROw', function(req, res){
    return "\r\n";
});
// 自定义format，其中包含自定义的token
logger.format('joke', '[info] :time :remote-addr :remote-user :method :url :from :status :referrer :response-time ms :user-agent :nextROw');
// 跳过不需要记录的请求
function skip (req) {
    return (req.url).indexOf('stylesheets') != -1
}
// 使用自定义的format
app.use(logger('joke'));
app.use(logger('joke',{skip: skip, stream: accessLogStream })); //打印到日志文件中
// logger   ------------end--------------


//配置session
app.use(session({
    //secret，配置加密字符串，它会在原有的基础上再和secret的值去拼接加密
    //目的是加强安全性，防止客户端恶意伪造
    secret: 'duguangyan',
    resave: false,
    saveUninitialized: true//无论是否使用session,默认只要对页面发起请求，都会给客户端一个cookie
}));


// 全局跨域处理
app.all('*', function(req, res, next) {
    console.log(req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
    next();
});

// 登录拦截器
app.use(async function (req, res, next) {
    // 放行login和save请求
    if (req.url.indexOf('/api/user/login')== -1  && req.url.indexOf('/api/user/save') == -1 && req.url.indexOf('/api/captcha/get-img-verify') == -1 && req.url.indexOf('/public/upload') == -1) {
        // 获取请求头token
        let token = req.headers.token;

        // 验证客户端的token与数据库的token是否一致
        if (token == undefined || token == "" || token == null) {
            res.send({code: 403, msg: '请先登录'});
            return false;
        }

        let users = await userHttp.select('token',token);
        req.session.userId = users[0].id;
        if(users==null || users==undefined || users.length<=0){
            res.send({code: 403, msg: '请重新登录'});
            return false;
        }
        next();
    } else {
        next();
    }
});

// node路由配置
app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/common', loadRouter);
app.use('/api/classify', classifyRouter);
app.use('/api/task', taskRouter);
app.use('/api/address', addressRouter);
app.use('/api/captcha', captchaRouter);
app.use('/api/order', orderRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  if(err.status == 404){
      res.send({
          code:1,
          data:null,
          msg:"404 请求失败"
      });
      return false;
  }
  res.status(err.status || 500);
  res.render('error');

});

// 防止程序报错崩溃
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});


module.exports = app;
