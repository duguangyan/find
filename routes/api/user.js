let express = require('express');
let router = express.Router();
let userHttp = require('../../service/user');
let result = require("../../utils/result");
let common = require("../../utils/common");
let moment = require('moment');
let utility=require("utility");
/**
 * Promise 异常统一处理
 */
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve()
        .then(() => fn(req, res, next))
        .catch((e)=>{
            if(e.sqlMessage){
                res.send(result.httpErr(e.sqlMessage,"数据库异常捕获"));
            }else if(e.message){
                res.send(result.httpErr(e.message,"错误异常捕获"));
            }else{
                res.send(result.httpErr(e,"异常捕获"));
            }
        });

/**
 * @api {get} /api/user/show 查询所有用户
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 查询所有用户
 * @apiName show
 * @apiGroup User
 * @apiParam {String} [page=1] page 第几页
 * @apiParam {String} [size=10] size 每页数量
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" :
 *      {
 *           "list": [
 *               {
 *                   "id": 154,          // id
 *                   "name": "杜光焱2",   // 姓名
 *                   "mobile": "11",     // 手机号码
 *                   "photo": "http://img.52z.com/upload/news/image/20180628/20180628064705_79123.jpg",      // 头像图片地址
 *                   "token": "nq7tCaoekrCBUB48FesDy8DsaSu9Cy8tWQZSv8lI1qw2r6HdW6NdlVG9X4C7RGwUWy4nsVa49DdkxKJwA56JNBcYwJoFCqgz1LWKC5gx9fv7",      // token
 *                   "create_time": "2019-04-21T02:43:48.000Z",     // 创建时间
 *                   "update_time": "2019-04-21T02:45:50.000Z"      // 更新时间
 *               }
 *           ],
 *           "total": 7,     // 总页数
 *           "page": 1,      // 当前第几页
 *           "size": 10      // 每页条数
 *       }
 *      "msg":"成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/user/show
 * @apiVersion 1.0.0
 */
router.get('/show',asyncHandler(async (req, res, next) => {
    let page = typeof req.query.page != "undefined" ? parseInt(req.query.page):req.query.page;
    let size = typeof req.query.size != "undefined" ? parseInt(req.query.size):req.query.size;

    debugger
    let data = await userHttp.show(page,size);
    data.list.forEach((o,i)=>{
        let create_time = moment(o.create_time).format('YYYY-MM-DD HH:mm:ss');
        let update_time = moment(o.update_time).format('YYYY-MM-DD HH:mm:ss');
        o.create_time = create_time;
        o.update_time = update_time;
    })
    res.send(result.httpSuccess(data));
}))


/**
 * @api {get} /api/user/findByUnce 根据KEY查询用户
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 根据KEY查询用户
 * @apiName findByUnce
 * @apiGroup User
 * @apiParam {String} key 查询字段名称(必)
 * @apiParam {String} value 查询字段内容(必)
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" :
 *       {
 *           "id": 154,          // id
 *           "name": "杜光焱2",   // 姓名
 *           "mobile": "11",     // 手机号码
 *           "photo": "http://img.52z.com/upload/news/image/20180628/20180628064705_79123.jpg",      // 头像图片地址
 *           "token": "nq7tCaoekrCBUB48FesDy8DsaSu9Cy8tWQZSv8lI1qw2r6HdW6NdlVG9X4C7RGwUWy4nsVa49DdkxKJwA56JNBcYwJoFCqgz1LWKC5gx9fv7",      // token
 *           "create_time": "2019-04-21T02:43:48.000Z",     // 创建时间
 *           "update_time": "2019-04-21T02:45:50.000Z"      // 更新时间
 *       }
 *      "msg":"成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/user/findByUnce
 * @apiVersion 1.0.0
 */
router.get('/findByUnce',asyncHandler(async (req, res, next) => {
    let key   = req.query.key;
    let value = req.query.value;
    let data = await userHttp.select(key,value);

    let create_time = moment(data[0].create_time).format('YYYY-MM-DD HH:mm:ss');
    let update_time = moment(data[0].update_time).format('YYYY-MM-DD HH:mm:ss');
    data[0].create_time = create_time;
    data[0].update_time = update_time;
    res.send(result.httpSuccess(data[0]));
}))



/**
 * @api {post} /api/user/save 保存用户
 * @apiDescription 保存用户
 * @apiName save
 * @apiGroup User
 * @apiParam {String} name 名称(必)
 * @apiParam {String} password 密码(必)
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" : null
 *      "msg":"成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/user/save
 * @apiVersion 1.0.0
 */
router.post('/save',asyncHandler(async (req, res, next) => {
    let name     = req.query.name || req.body.name;
    let password = req.query.password || req.body.password;
    // 验证数据
    if(name==""||name==undefined){
        res.send(result.httpFail("用户名不能为空"));
        return false;
    }
    if(password==""||password==undefined||password.length<6||password.length>=18){
        res.send(result.httpFail("请填写6-18位密码"));
        return false;
    }
    // 查询数据库是否重名
    let userList = await userHttp.select("name",name);
    if(userList.length>0){
        res.send(result.httpFail("用户名已存在"));
        return false;
    }
    // 插入数据库
    password = utility.md5(password);
    let token = common.randomWord(true,32,64);

    let attributenames = "(name,password,token)";
    let attributes = '("'+ name +'","'+ password+'","'+ token +'")';
    let data = await userHttp.insert(attributenames,attributes);

    res.send(result.httpSuccess(data[0]));


}))




/**
 * @api {post} /api/user/update 更新用户信息
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 更新用户信息
 * @apiName update
 * @apiGroup User
 * @apiParam {String} key 数据库字段名称(必)         例如: name
 * @apiParam {String} value 修改值(必)             例如: "小白"
 * @apiParam {String} wherekey 数据库字段名称(必)    例如: id
 * @apiParam {String} wherevalue 修改值(必)         例如: 1
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" : null
 *      "msg":"成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/user/update
 * @apiVersion 1.0.0
 */
router.post('/update',asyncHandler(async (req, res, next) => {
    let key     = req.query.key || req.body.key;
    let value = req.query.value || req.body.value;
    let wherekey     = req.query.wherekey || req.body.wherekey;
    let wherevalue = req.query.wherevalue || req.body.wherevalue;
    // 验证数据
    if(key==""||key==undefined||value==""||value==undefined ||wherekey==""||wherekey==undefined||wherevalue==""||wherevalue==undefined){
        res.send(result.httpFail("参数不能为空"));
        return false;
    }
    // 查询wherekey,wherevalue是否存在
    let users = await userHttp.select(wherekey,wherevalue);
    if(users == undefined ||users == null || users.length<=0){
        res.send(result.httpFail(wherekey+" 不存在"));
        return false;
    }
    // 更新数据库
    await userHttp.update(key,value,wherekey,wherevalue);
    res.send(result.httpSuccess());
}))



/**
 * @api {post} /api/user/delete 根据ID删除用户
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 根据ID删除用户
 * @apiName delete
 * @apiGroup User
 * @apiParam {String} id 用户ID(必)
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" : null
 *      "msg":"成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/user/delete
 * @apiVersion 1.0.0
 */
router.post('/delete',asyncHandler(async (req, res, next) => {
    let id = req.query.id || req.body.id;
    // 验证数据
    if(id==""||id==undefined){
        res.send(result.httpFail("ID不能为空"));
        return false;
    }
    // 更新数据库
    let key         = "is_del";
    let value       = "1";
    let wherekey    = "id";
    let wherevalue  = id;
    await userHttp.update(key,value,wherekey,wherevalue);
    res.send(result.httpSuccess());
}))


/**
 * @api {post} /api/user/login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup User
 * @apiParam {String} name 用户名称
 * @apiParam {String} password 用户密码
 * @apiParam {String} code 登录验证码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" : {
 *          "id": 177,                 // id
 *           "name": "duguangyan1",     // 账号名称
 *           "mobile": "15817390755",   // 手机
 *           "photo": "http://b-ssl.duitang.com/uploads/item/201706/22/20170622131955_h4eZS.thumb.700_0.jpeg",  // 头像图片
 *           "token": "nGWrMhK582C2HRXZuHGusXMWG5EDqLjmZdAQpltHwdD5FOJ7j9LC9GjqvJejfkxDCiGpNchGAawOMRAzNfPMsbM7hNEKJJG4EfHRRaLpGf59",   //token
 *           "create_time": "2019-04-23 04:48:01",   // 创建时间
 *           "update_time": "2019-04-23 04:48:01"    // 更新时间
 *      }
 *      "msg":"成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/user/login
 * @apiVersion 1.0.0
 */
router.post('/login',asyncHandler(async (req, res, next) => {
    let name     = req.query.name || req.body.name;
    let password = req.query.password || req.body.password;
    let code = req.query.code || req.body.code;

    // 验证数据
    if(name==""||name==undefined){
        res.send(result.httpFail("用户名不能为空"));
        return false;
    }
    if(password==""||password==undefined||password.length<6||password.length>=18){
        res.send(result.httpFail("请填写6-18位密码"));
        return false;
    }
    if(code != req.session['code']){
        res.send(result.httpFail("验证码错误"));
        return false;
    }
    let users = await userHttp.login(name,utility.md5(password));
    if(users!=undefined&&users.length>0){
        let token = common.randomWord(true,32,64);
        await userHttp.update('token',token,'id',users[0].id);
        req.session.token = token;
        req.session.userId = users[0].id;
        users[0].token = token;
        res.send(result.httpSuccess(users[0]));
        return false;
    }
    res.send(result.httpFail("用户名或者密码错误"));
}))




/**
 * @api {post} /api/user/updateByPassword 用户修改密码
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 用户修改密码
 * @apiName updateByPassword
 * @apiGroup User
 * @apiParam {String} password 用户密码
 * @apiParam {String} resPassword 重复密码
 * @apiParam {String} code 登录验证码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" : 153   // 修改密码的用户ID
 *      "msg":"成功"    // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/user/updateByPassword
 * @apiVersion 1.0.0
 */
router.post('/updateByPassword',asyncHandler(async (req, res, next) => {
    // let name     = req.query.name || req.body.name;
    let password = req.query.password || req.body.password;
    let resPassword = req.query.resPassword || req.body.resPassword;
    let code = req.query.code || req.body.code;

    // 验证数据
    // if(name==""||name==undefined){
    //     res.send(result.httpFail("用户名不能为空"));
    //     return false;
    // }
    if(password==""||password==undefined||password.length<6||password.length>=18){
        res.send(result.httpFail("请填写6-18位密码"));
        return false;
    }

    if(password!=resPassword){
        res.send(result.httpFail("两次输入的密码不一致"));
        return false;
    }

    if(code != req.session['code']){
        res.send(result.httpFail("验证码错误"));
        return false;
    }
    let token = req.headers.token;
    let selectUsers = await userHttp.select('token',token);

    if(selectUsers.length>0){
        await userHttp.updateByPassword(utility.md5(password),selectUsers[0].id);
        res.send(result.httpSuccess(selectUsers[0].id));
        return false;
    }else{
        res.send(result.httpFail("用户不存在"));
    }


    res.send(result.httpFail("未知错误"));
}))




/**
 * @api {post} /api/user/updateByName 用户修改名称
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 用户修改名称
 * @apiName updateByName
 * @apiGroup User
 * @apiParam {String} name 名称
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" : 153   // 修改名称的用户ID
 *      "msg":"成功"    // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/user/updateByName
 * @apiVersion 1.0.0
 */
router.post('/updateByName',asyncHandler(async (req, res, next) => {
    let name     = req.query.name || req.body.name;
    // 验证数据
    if(name==""||name==undefined){
        res.send(result.httpFail("名称不能为空"));
        return false;
    }
    let token = req.headers.token;
    let selectUsers = await userHttp.select('token',token);

    if(selectUsers.length>0){
        await userHttp.update('name',name,'id',selectUsers[0].id);
        res.send(result.httpSuccess(selectUsers[0].id));
        return false;
    }else{
        res.send(result.httpFail("用户不存在"));
    }

    res.send(result.httpFail("未知错误"));
}))




/**
 * @api {post} /api/user/updateByPhoto 用户修改头像
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 用户修改头像
 * @apiName updateByName
 * @apiGroup User
 * @apiParam {String} photo 头像地址
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" : 153   // 修改名称的用户ID
 *      "msg":"成功"    // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/user/updateByPhoto
 * @apiVersion 1.0.0
 */
router.post('/updateByPhoto',asyncHandler(async (req, res, next) => {

    let photo     = req.query.photo || req.body.photo;

    // 验证数据
    if(photo==""||photo==undefined){
        res.send(result.httpFail("头像地址不能为空"));
        return false;
    }
    let token = req.headers.token;
    let selectUsers = await userHttp.select('token',token);

    if(selectUsers.length>0){
        await userHttp.update('photo',photo,'id',selectUsers[0].id);
        res.send(result.httpSuccess(selectUsers[0].id));
        return false;
    }else{
        res.send(result.httpFail("用户不存在"));
    }

    res.send(result.httpFail("未知错误"));
}))



module.exports = router;