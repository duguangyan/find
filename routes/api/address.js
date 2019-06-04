let express = require('express');
let router = express.Router();
let addressHttp = require('../../service/address');
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
 * @api {get} /api/address/show 查询所有地址
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 查询所有地址
 * @apiName show
 * @apiGroup Address
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
 *                  "id": 1,                                        // 地址ID
                    "is_default": 0,                                // 是否默认  0、不是 1、是
                    "city_str": "广东省广州市花都区",                  // 省市区字符串
                    "province": "广东省",                            // 省份
                    "city": "广州市",                                // 城市
                    "district": "花都区",                            // 区（县）
                    "lat": 12.12,                                   // 经度
                    "lng": 12.32,                                   // 维度
                    "consignee": "我是收货人",                        // 收货人名称
                    "mobile": "15817395555",                        // 联系电话
                    "room": "迎宾大道28号",                           // 街道地址
                    "stall": "皮多多皮具",                            // 公司或个人名称
                    "remark": "找料",                                // 备注
                    "is_del": 0,                                    // 是否软删除  0、否  1、是
                    "create_time": "2019-05-16 14:39:59",           // 创建时间
                    "update_time": "2019-05-16 14:39:59"            // 更新时间
 *               }
 *           ],
 *           "total": 7,     // 总页数
 *           "page": 1,      // 当前第几页
 *           "size": 10      // 每页条数
 *       }
 *      "msg":"成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/address/show
 * @apiVersion 1.0.0
 */
router.get('/show',asyncHandler(async (req, res, next) => {

    let page = typeof req.query.page != "undefined" ? parseInt(req.query.page):req.query.page;
    let size = typeof req.query.size != "undefined" ? parseInt(req.query.size):req.query.size;
    let data = await addressHttp.show(page,size);
    data.list.forEach((o,i)=>{
        let create_time = moment(o.create_time).format('YYYY-MM-DD HH:mm:ss');
        let update_time = moment(o.update_time).format('YYYY-MM-DD HH:mm:ss');
        o.create_time = create_time;
        o.update_time = update_time;
    })
    res.send(result.httpSuccess(data));
}))



/**
 * @api {get} /api/address/selectById 根据ID查询地址
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 根据ID查询地址
 * @apiName selectById
 * @apiGroup Address
 * @apiParam {Number} id 地址ID
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" :
 *      {
 *
 *          "list": [
 *               {
 *                  "id": 1,                                        // 地址ID
                    "is_default": 0,                                // 是否默认  0、不是 1、是
                    "city_str": "广东省广州市花都区",                  // 省市区字符串
                    "province": "广东省",                            // 省份
                    "city": "广州市",                                // 城市
                    "district": "花都区",                            // 区（县）
                    "lat": 12.12,                                   // 经度
                    "lng": 12.32,                                   // 维度
                    "consignee": "我是收货人",                        // 收货人名称
                    "mobile": "15817395555",                        // 联系电话
                    "room": "迎宾大道28号",                           // 街道地址
                    "stall": "皮多多皮具",                            // 公司或个人名称
                    "remark": "找料",                                // 备注
                    "is_del": 0,                                    // 是否软删除  0、否  1、是
                    "create_time": "2019-05-16 14:39:59",           // 创建时间
                    "update_time": "2019-05-16 14:39:59"            // 更新时间
 *               }
 *           ],
 *       }
 *      "msg":"成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/address/selectById
 * @apiVersion 1.0.0
 */
router.get('/selectById',asyncHandler(async (req, res, next) => {
    let id   = req.query.id || req.body.id;
    let data = await addressHttp.select('id',id);
    data.forEach((o,i)=>{
        let create_time = moment(o.create_time).format('YYYY-MM-DD HH:mm:ss');
        let update_time = moment(o.update_time).format('YYYY-MM-DD HH:mm:ss');
        o.create_time = create_time;
        o.update_time = update_time;
    })
    res.send(result.httpSuccess(data));
}))




/**
 * @api {get} /api/address/deleteById 根据ID删除地址
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 根据ID删除地址
 * @apiName deleteById
 * @apiGroup Address
 * @apiParam {Number} id 地址ID
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",   // 状态码
 *      "data" : {id:13} // 返回删除的地址ID
 *      "msg"  :"成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/address/deleteById
 * @apiVersion 1.0.0
 */
router.get('/deleteById',asyncHandler(async (req, res, next) => {
    let id   = req.query.id || req.body.id;
    let data = await addressHttp.update('is_del',1,'id',id);
    res.send(result.httpSuccess({id}));
}))




/**
 * @api {get} /api/address/selectByUid 查询当前用户所有地址
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 查询当前用户所有地址
 * @apiName selectByUid
 * @apiGroup Address
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" :
 *      {
 *
 *          "list": [
 *               {
 *                  "id": 1,                                        // 地址ID
                    "is_default": 0,                                // 是否默认  0、不是 1、是
                    "city_str": "广东省广州市花都区",                  // 省市区字符串
                    "province": "广东省",                            // 省份
                    "city": "广州市",                                // 城市
                    "district": "花都区",                            // 区（县）
                    "lat": 12.12,                                   // 经度
                    "lng": 12.32,                                   // 维度
                    "consignee": "我是收货人",                        // 收货人名称
                    "mobile": "15817395555",                        // 联系电话
                    "room": "迎宾大道28号",                           // 街道地址
                    "stall": "皮多多皮具",                            // 公司或个人名称
                    "remark": "找料",                                // 备注
                    "is_del": 0,                                    // 是否软删除  0、否  1、是
                    "create_time": "2019-05-16 14:39:59",           // 创建时间
                    "update_time": "2019-05-16 14:39:59"            // 更新时间
 *               }
 *           ],
 *       }
 *      "msg":"成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/address/selectByUid
 * @apiVersion 1.0.0
 */
router.get('/selectByUid',asyncHandler(async (req, res, next) => {
    let uid = req.session.userId;  //  获取用户id
    let data = await addressHttp.select('uid',uid);
    data.forEach((o,i)=>{
        let create_time = moment(o.create_time).format('YYYY-MM-DD HH:mm:ss');
        let update_time = moment(o.update_time).format('YYYY-MM-DD HH:mm:ss');
        o.create_time = create_time;
        o.update_time = update_time;
    })
    res.send(result.httpSuccess(data));
}))



/**
 * @api {post} /api/address/save 保存地址
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 保存
 * @apiName save
 * @apiGroup Address
 * @apiParam {Number} [is_default=0] 是否设为默认
 * @apiParam {String} [city_str]  地址字符串
 * @apiParam {String} province 省
 * @apiParam {String} city 市
 * @apiParam {String} district 区
 * @apiParam {String} lat 经度
 * @apiParam {String} lng 纬度
 * @apiParam {String} consignee 收货人
 * @apiParam {String} mobile 手机
 * @apiParam {String} [room] 详细地址
 * @apiParam {String} [stall] 采购商名称
 * @apiParam {String} [remark] 备注
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" :
 *      {
 *
 *          "list": [
 *               {
 *                  "id": 1,                                        // 地址ID
                    "is_default": 0,                                // 是否默认  0、不是 1、是
                    "city_str": "广东省广州市花都区",                  // 省市区字符串
                    "province": "广东省",                            // 省份
                    "city": "广州市",                                // 城市
                    "district": "花都区",                            // 区（县）
                    "lat": 12.12,                                   // 经度
                    "lng": 12.32,                                   // 维度
                    "consignee": "我是收货人",                        // 收货人名称
                    "mobile": "15817395555",                        // 联系电话
                    "room": "迎宾大道28号",                           // 街道地址
                    "stall": "皮多多皮具",                            // 公司或个人名称
                    "remark": "找料",                                // 备注
                    "is_del": 0,                                    // 是否软删除  0、否  1、是
                    "create_time": "2019-05-16 14:39:59",           // 创建时间
                    "update_time": "2019-05-16 14:39:59"            // 更新时间
 *               }
 *           ],
 *       }
 *      "msg":"成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/address/save
 * @apiVersion 1.0.0
 */
router.post('/save',asyncHandler(async (req, res, next) => {
    let data = req.body;
    let attributenames = `(province,city,district,city_str,lat,lng,consignee,mobile,room,stall,remark,is_default)`;
    let attributes = '("'+ data.province +'","'+ data.city +'","'+ data.district +'","'+ data.city_str +'","'+ data.lat +'","'+ data.lng +'","'+ data.consignee +'","'+ data.mobile +'","'+ data.room +'","'+ data.stall +'","'+ data.remark +'","'+ data.is_default +'")';
    let returnData ;
    if(data.is_default == 1){
        returnData = await addressHttp.insertWiteDefaultTransaction(attributenames, attributes);
        res.send(result.httpSuccess({id:returnData[1].insertId}));
    }else{
        returnData = await addressHttp.insert(attributenames, attributes);
        res.send(result.httpSuccess({id:returnData.insertId}));
    }

}))



/**
 * @api {post} /api/address/updateById 根据ID更新地址
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 根据ID更新地址
 * @apiName updateById
 * @apiGroup Address
 * @apiParam {Number} [is_default=0] 是否设为默认
 * @apiParam {String} [city_str]  地址字符串
 * @apiParam {String} province 省
 * @apiParam {String} city 市
 * @apiParam {String} district 区
 * @apiParam {String} lat 经度
 * @apiParam {String} lng 纬度
 * @apiParam {String} consignee 收货人
 * @apiParam {String} mobile 手机
 * @apiParam {String} [room] 详细地址
 * @apiParam {String} [stall] 采购商名称
 * @apiParam {String} [remark] 备注
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" :
 *      {
 *
 *          "list": [
 *               {
 *                  "id": 1,                                        // 地址ID
                    "is_default": 0,                                // 是否默认  0、不是 1、是
                    "city_str": "广东省广州市花都区",                  // 省市区字符串
                    "province": "广东省",                            // 省份
                    "city": "广州市",                                // 城市
                    "district": "花都区",                            // 区（县）
                    "lat": 12.12,                                   // 经度
                    "lng": 12.32,                                   // 维度
                    "consignee": "我是收货人",                        // 收货人名称
                    "mobile": "15817395555",                        // 联系电话
                    "room": "迎宾大道28号",                           // 街道地址
                    "stall": "皮多多皮具",                            // 公司或个人名称
                    "remark": "找料",                                // 备注
                    "is_del": 0,                                    // 是否软删除  0、否  1、是
                    "create_time": "2019-05-16 14:39:59",           // 创建时间
                    "update_time": "2019-05-16 14:39:59"            // 更新时间
 *               }
 *           ],
 *       }
 *      "msg":"成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/address/updateById
 * @apiVersion 1.0.0
 */
router.post('/updateById',asyncHandler(async (req, res, next) => {
    let data = req.body;
    let values = `id=${data.id},province='${data.province}',city='${data.city}',district='${data.district}',city_str='${data.city_str}',lat=${data.lat},lng=${data.lng},consignee='${data.consignee}',mobile='${data.mobile}',room='${data.room}',stall='${data.stall}',remark='${data.remark}',is_default=${data.is_default}`;
    if(data.is_default == 1){
        await addressHttp.updateByIdWiteTransaction(values, data.id);
    }else{
        await addressHttp.select("id", data.id).then(async(res)=>{
            await addressHttp.updateById(values, data.id);
            if(res[0].is_default == 1){
                await addressHttp.updateByLastDefault();
            }
        });
    }
    res.send(result.httpSuccess({id:data.id}));
}))





/**
 * @api {post} /api/address/updateByIsDefault 根据ID设置默认地址
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 根据ID设置默认地址
 * @apiName updateByIsDefault
 * @apiGroup Address
 * @apiParam {Number} id 地址ID
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" : 1     // 修改的地址ID
 *      "msg":"成功"    // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/address/updateByIsDefault
 * @apiVersion 1.0.0
 */
router.post('/updateByIsDefault',asyncHandler(async (req, res, next) => {
    let uid = req.session.userId;
    let id  = req.query.id || req.body.id;
    let _res = res;
    if(id==undefined || id == null || id ==''){
        res.send(result.httpFail("地址ID不能为空"));
        return false;
    }
    let address = await addressHttp.selectByIdAndUid(id,uid);
    if(address.length>0){
        await addressHttp.updateIsDefaultWiteDefaultTransaction(id,uid);
        res.send(result.httpSuccess(id));
        return false;
    }else{
        res.send(result.httpFail('地址不存在'));
        return false;
    }
    res.send(result.httpFail("地址未知错误"));
}))





module.exports = router;