let express = require('express');
let router = express.Router();
let taskHttp = require('../../service/task');
let result = require("../../utils/result");
let common = require("../../utils/common");
let moment = require('moment');

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
 * @api {get} /api/task/show 获取全部任务
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 获取全部任务
 * @apiName show
 * @apiGroup Task
 * @apiParam {Number} [page=1]   第几页
 * @apiParam {Number} [size=10]  每页几条
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *       "data": [
            {
                "id": 1,
                "uid": 1,
                "cid": 1，2，3,
                "desc": "描述描述描述描述描述描述",
                "find_type": 1,
                "task_type": 1,
                "find_type_mode": 1,
                "task_address_id": 1,
                "imgs": "http://localhost:3001/public/upload/IYjfYFfCewPVusQC1557382532311.jpg",
                "checkType": "面料>皮料>马皮料"
            }
        ],
 *      "msg"  : "成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/task/show
 * @apiVersion 1.0.0
 */
router.get('/show',asyncHandler(async (req, res, next) => {
    let page = req.query.page || req.body.page;
    let size = req.query.size || req.body.size;
    let tasks = await taskHttp.show(page,size);
    res.send(result.httpSuccess(tasks));
}))



/**
 * @api {get} /api/task/select 根据UID获取全部任务
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 根据UID获取全部任务
 * @apiName select
 * @apiGroup Task
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *       "data": [
            {
                "id": 1,
                "uid": 1,
                "cid": 1，2，3,
                "desc": "描述描述描述描述描述描述",
                "find_type": 1,
                "task_type": 1,
                "find_type_mode": 1,
                "task_address_id": 1,
                "imgs": "http://localhost:3001/public/upload/IYjfYFfCewPVusQC1557382532311.jpg",
                "checkType": "面料>皮料>马皮料"
            }
        ],
 *      "msg"  : "成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/task/select
 * @apiVersion 1.0.0
 */
router.get('/select',asyncHandler(async (req, res, next) => {
    let uid = req.session.userId;  //  获取用户id
    let tasks = await taskHttp.select(uid);
    res.send(result.httpSuccess(tasks));
}))



/**
 * @api {post} /api/task/delete 删除任务
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 根据ID删除任务
 * @apiName delete
 * @apiGroup Task
 * @apiParam {Number} id  任务ID
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *       "data": [],
 *      "msg"  : "成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/task/delete
 * @apiVersion 1.0.0
 */
router.post('/delete',asyncHandler(async (req, res, next) => {
    let id = req.query.id || req.body.id;  // 任务id
    await taskHttp.selectByOthers('id',id).then(async (data)=>{
        console.log(data);
        console.log('--------------------------');
        if(data.length>0){
            await taskHttp.update('is_del',1,'id',id);
            res.send(result.httpSuccess());
        }else{
            res.send(result.httpFail("未查询到相应任务,请联系管理员"));
        }
    })

}))



/**
 * @api {post} /api/task/save 保存任务
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 保存任务
 * @apiName save
 * @apiVersion 1.1.0
 * @apiGroup Task
 * @apiParam {Number} task_type 任务类型1、立即找料2、立即取送
 * @apiParam {Object[]} form_data  任务内容
 * @apiParam  {String} -cid form_data[i].cid 分类ID 例如: "1,4,26"
 * @apiParam  {String} -checkType form_data[i].checkType 分类分类名称字符串 例如: "面料>皮料>马毛皮"
 * @apiParam  {Number} [-find_type] form_data[i].find_type 找料方式 1、图片找料 2、按样找料3、按描述找料
 * @apiParam  {Number} [-find_type_mode] form_data[i].find_type_mode 找料方式按样找料 1、上面取样 2、寄送样品
 * @apiParam  {String} -desc form_data[i].desc 描述
 * @apiParam  {String[]} [-front_img] form_data[i].front_img 图片集合 例如: [1.jpg,2.jpg]
 * @apiParam  {Number} [-fetch_num] form_data[i].fetch_num 取送数量
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data": {id:[12132]},  // 返回任务ID
 *      "msg"  : "成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/task/save
 * @apiVersion 1.0.0
 */
router.post('/save',asyncHandler(async (req, res, next) => {
    let uid = req.session.userId;  //  获取用户id
    let task_type = req.query.task_type || req.body.task_type;  // 任务类型
    let form_data = req.query.form_data || req.body.form_data;  // 任务内容
    let tasks = []; // 返回数据
    // 验证数据
    if(task_type==""||task_type==undefined){
        res.send(result.httpFail("找料或取送类型不能为空"));
        return false;
    }
    if(form_data==""||form_data==undefined || form_data.length<=0){
        res.send(result.httpFail("找料或取送填写信息不能为空"));
        return false;
    }
    if(task_type == 1){   // 立即找料
        let attributenames = "";
        let attributes = "";

        for(let i=0;i<form_data.length;i++) {
            if (form_data[i].cid == "" || form_data[i].cid == undefined || form_data[i].checkType == "" || form_data[i].checkType == undefined) {
                res.send(result.httpFail("立即找料第" + (i+1) + "个任务物料类型不能为空"));
                return false;
            }
            if (form_data[i].desc == "" || form_data[i].desc == undefined) {
                res.send(result.httpFail("立即找料第" + (i+1) + "个任务描述不能为空"));
                return false;
            }
            if (form_data[i].find_type == 1) {  // 按图找料
                if (form_data[i].front_img == "" || form_data[i].front_img == undefined || form_data[i].front_img.length <= 0) {
                    res.send(result.httpFail("立即找料(按图找料)第" + (i+1) + "个任务图片至少有一张"));
                    return false;
                }
                let front_img_string = "";
                form_data[i].front_img.forEach((oo, ii) => {
                    if(form_data[i].front_img.length-1 == ii){
                        front_img_string += oo.toString();
                    }else{
                        front_img_string += oo.toString() + ",";
                    }

                })
                attributenames = "(uid,cid,checkType,des,find_type,task_type,front_img,fee)";
                attributes = "('" + uid + "','" + form_data[i].cid + "','" + form_data[i].checkType + "','" + form_data[i].desc + "','" + form_data[i].find_type + "','" + task_type + "','" + front_img_string +  "','" + 30 +"')";
                await taskHttp.insert(attributenames, attributes).then(async (res) => {
                    tasks.push(res.insertId);
                });
            }else if(form_data[i].find_type == 2){  // 按样找料
                if(form_data[i].find_type_mode == 1){
                    attributenames = "(uid,cid,checkType,des,find_type,task_type,find_type_mode,task_address_id,fee)";
                    attributes = "('" + uid + "','" + form_data[i].cid + "','" + form_data[i].checkType + "','" + form_data[i].desc + "','" + form_data[i].find_type + "','" + task_type + "','" +  form_data[i].find_type_mode + "','" + form_data[i].task_address_id + "','" + 30 +"')";
                }else {
                    attributenames = "(uid,cid,checkType,des,find_type,task_type,find_type_mode,fee)";
                    attributes = "('" + uid + "','" + form_data[i].cid + "','" + form_data[i].checkType + "','" + form_data[i].desc + "','" + form_data[i].find_type + "','" + task_type + "','" +  form_data[i].find_type_mode + "','" + 30 +"')";
                }

                await taskHttp.insert(attributenames, attributes).then(async (res) => {
                    tasks.push(res.insertId);
                });

            }else if(form_data[i].find_type == 3){  // 按描述找料
                attributenames = "(uid,cid,checkType,des,find_type,task_type,fee)";
                attributes = "('" + uid + "','" + form_data[i].cid + "','" + form_data[i].checkType + "','" + form_data[i].desc + "','" + form_data[i].find_type + "','" + task_type + "','" + 30 + "')";
                await taskHttp.insert(attributenames, attributes).then(async (res) => {
                    tasks.push(res.insertId);
                });
            }
        }

    }else if(task_type == 2){   // 立即取送
        let attributenames = "";
        let attributes = "";

        for(let i=0;i<form_data.length;i++) {
            if (form_data[i].cid == "" || form_data[i].cid == undefined || form_data[i].checkType == "" || form_data[i].checkType == undefined) {
                res.send(result.httpFail("立即取送物料类型不能为空"));
                return false;
            }
            if (form_data[i].desc == "" || form_data[i].desc == undefined) {
                res.send(result.httpFail("立即取送描述不能为空"));
                return false;
            }

            if (form_data[i].front_img == "" || form_data[i].front_img == undefined || form_data[i].front_img.length <= 0) {
                res.send(result.httpFail("立即取送图片至少有一张"));
                return false;
            }
            let front_img_string = "";
            form_data[i].front_img.forEach((oo, ii) => {
                if(form_data[i].front_img.length-1 == ii){
                    front_img_string += oo.toString();
                }else{
                    front_img_string += oo.toString() + ",";
                }

            })
            attributenames = "(uid,cid,checkType,des,find_type,task_type,front_img,task_address_id,fetch_num,fee)";
            attributes = "('" + uid + "','" + form_data[i].cid + "','" + form_data[i].checkType + "','" + form_data[i].desc + "','" + form_data[i].find_type + "','" + task_type + "','" + front_img_string +  "','" + form_data[i].task_address_id + "','" + form_data[i].fetch_num + "','" + 25 + "')";
            await taskHttp.insert(attributenames, attributes).then(async (res) => {
                tasks.push(res.insertId);
            });

        }

    }else{
        res.send(result.httpFail("找料或取送类型类型错误"));
        return false;
    }
    console.log(tasks);
    res.send(result.httpSuccess({ids:tasks}));
}))





/**
 * @api {post} /api/task/updateById 根据ID更新任务
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 根据ID更新任务
 * @apiName updateById
 * @apiGroup Task
 * @apiParam {Number} task_type 任务类型1、立即找料2、立即取送
 * @apiParam {Object[]} form_data  任务内容
 * @apiParam  {String} -cid form_data[i].cid 分类ID 例如: "1,4,26"
 * @apiParam  {String} -checkType form_data[i].checkType 分类分类名称字符串 例如: "面料>皮料>马毛皮"
 * @apiParam  {Number} [-find_type] form_data[i].find_type 找料方式 1、图片找料 2、按样找料3、按描述找料
 * @apiParam  {Number} [-find_type_mode] form_data[i].find_type_mode 找料方式按样找料 1、上面取样 2、寄送样品
 * @apiParam  {String} -desc form_data[i].desc 描述
 * @apiParam  {String[]} [-front_img] form_data[i].front_img 图片集合 例如: [1.jpg,2.jpg]
 * @apiParam  {Number} [-fetch_num] form_data[i].fetch_num 取送数量
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data": {id:[12132]},  // 返回任务ID
 *      "msg"  : "成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/task/updateById
 * @apiVersion 1.0.0
 */
router.post('/updateById',asyncHandler(async (req, res, next) => {
    let uid = req.session.userId;  //  获取用户id
    let form_data = req.query.form_data || req.body.form_data;  // 任务内容
    let tid = form_data.id;  // 任务id
    // 验证数据
    if(form_data==""||form_data==undefined || form_data.length<=0){
        res.send(result.httpFail("找料或取送填写信息不能为空"));
        return false;
    }

    let values = ""; // 更新数据sql
    if(form_data.task_type == 1){   // 立即找料

        if (form_data.cid == "" || form_data.cid == undefined || form_data.checkType == "" || form_data.checkType == undefined) {
            res.send(result.httpFail("立即找料物料类型不能为空"));
            return false;
        }
        if (form_data.desc == "" || form_data.desc == undefined) {
            res.send(result.httpFail("立即找料描述不能为空"));
            return false;
        }
        if (form_data.find_type == 1) {  // 按图找料
            if (form_data.front_img == "" || form_data.front_img == undefined || form_data.front_img.length <= 0) {
                res.send(result.httpFail("立即找料(按图找料)图片至少有一张"));
                return false;
            }
            let front_img_string = "";
            form_data.front_img.forEach((oo, ii) => {
                if(form_data.front_img.length-1 == ii){
                    front_img_string += oo.toString();
                }else{
                    front_img_string += oo.toString() + ",";
                }

            })
            values = `uid=${uid},cid='${form_data.cid}',checkType='${form_data.checkType}',des='${form_data.desc}',find_type=${form_data.find_type},task_type=${form_data.task_type},front_img='${front_img_string}'`;
            await taskHttp.updateById(values, tid);
        }else if(form_data.find_type == 2){  // 按样找料
            if(form_data.find_type_mode == 1){
                values = `uid=${uid},cid='${form_data.cid}',checkType='${form_data.checkType}',des='${form_data.desc}',find_type=${form_data.find_type},task_type=${form_data.task_type},find_type_mode=${form_data.find_type_mode},task_address_id=${form_data.task_address_id}`;

            }else {
                values = `uid=${uid},cid='${form_data.cid}',checkType='${form_data.checkType}',des='${form_data.desc}',find_type=${form_data.find_type},task_type=${form_data.task_type},find_type_mode=${form_data.find_type_mode}`;
            }
            await taskHttp.updateById(values, tid);

        }else if(form_data.find_type == 3){  // 按描述找料
            values = `uid=${uid},cid='${form_data.cid}',checkType='${form_data.checkType}',des='${form_data.desc}',find_type=${form_data.find_type},task_type=${form_data.task_type}`;
            await taskHttp.updateById(values, tid);
        }


    }else if(form_data.task_type == 2){   // 立即取送


        if (form_data.cid == "" || form_data.cid == undefined || form_data.checkType == "" || form_data.checkType == undefined) {
            res.send(result.httpFail("立即取送物料类型不能为空"));
            return false;
        }
        if (form_data.desc == "" || form_data.desc == undefined) {
            res.send(result.httpFail("立即取送描述不能为空"));
            return false;
        }

        if (form_data.front_img == "" || form_data.front_img == undefined || form_data.front_img.length <= 0) {
            res.send(result.httpFail("立即取送图片至少有一张"));
            return false;
        }
        let front_img_string = "";
        form_data.front_img.forEach((oo, ii) => {
            if(form_data.front_img.length-1 == ii){
                front_img_string += oo.toString();
            }else{
                front_img_string += oo.toString() + ",";
            }

        })
        values = `uid=${uid},cid='${form_data.cid}',checkType='${form_data.checkType}',des='${form_data.desc}',find_type=${form_data.find_type},task_type=${form_data.task_type},front_img='${front_img_string}',task_address_id=${form_data.task_address_id},fetch_num=${form_data.fetch_num}`;
        await taskHttp.updateById(values, tid);

    }else{
        res.send(result.httpFail("找料或取送类型类型错误"));
        return false;
    }
    res.send(result.httpSuccess());
}))





module.exports = router;