let express = require('express');
let router = express.Router();
let classifyHttp = require('../../service/classify');
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
 * @api {get} /api/classify/find 获取全部分类
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 获取全部分类
 * @apiName find
 * @apiGroup Classify
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *       "data": {
        "id": 1,
        "name": "分类",
        "pid": 0,
        "create_time": "2019-05-06 10:07:47",
        "update_time": "2019-05-06 10:07:49",
        "children": [
            {
                "id": 2,
                "name": "面料",
                "pid": 1,
                "create_time": "2019-05-05 15:45:52",
                "update_time": "2019-05-05 15:45:54",
                "children": [
                    {
                        "id": 3,
                        "name": "皮料",
                        "pid": 2,
                        "create_time": "2019-05-05 15:46:28",
                        "update_time": "2019-05-05 15:46:33",
                        "children": [
                            {
                                "id": 4,
                                "name": "羊皮",
                                "pid": 3,
                                "create_time": "2019-05-05 15:46:31",
                                "update_time": "2019-05-05 15:46:35",
                                "children": [
                                    {
                                        "id": 10,
                                        "name": "1厘米",
                                        "pid": 4,
                                        "create_time": "2019-05-06 10:42:30",
                                        "update_time": "2019-05-06 10:42:39",
                                        "children": []
                                    },
                                    {
                                        "id": 11,
                                        "name": "2厘米",
                                        "pid": 4,
                                        "create_time": "2019-05-06 10:42:34",
                                        "update_time": "2019-05-06 10:42:41",
                                        "children": []
                                    },
                                    {
                                        "id": 12,
                                        "name": "3厘米",
                                        "pid": 4,
                                        "create_time": "2019-05-06 10:42:36",
                                        "update_time": "2019-05-06 10:42:43",
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 5,
                "name": "辅料",
                "pid": 1,
                "create_time": "2019-05-05 16:17:44",
                "update_time": "2019-05-05 16:17:46",
                "children": [
                    {
                        "id": 8,
                        "name": "里布",
                        "pid": 5,
                        "create_time": "2019-05-05 17:47:30",
                        "update_time": "2019-05-05 17:47:32",
                        "children": [
                            {
                                "id": 9,
                                "name": "色丁",
                                "pid": 8,
                                "create_time": "2019-05-05 17:47:34",
                                "update_time": "2019-05-05 17:47:36",
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 6,
                "name": "五金",
                "pid": 1,
                "create_time": "2019-05-05 17:47:21",
                "update_time": "2019-05-05 17:47:23",
                "children": []
            },
            {
                "id": 7,
                "name": "其他",
                "pid": 1,
                "create_time": "2019-05-05 17:47:25",
                "update_time": "2019-05-05 17:47:27",
                "children": []
            }
        ]
    },
 *      "msg"  : "成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/classify/find
 * @apiVersion 1.0.0
 */
router.get('/find',asyncHandler(async (req, res, next) => {
    let  m = await classifyHttp.select();
    m.forEach((o,i)=>{
        let create_time = moment(o.create_time).format('YYYY-MM-DD HH:mm:ss');
        let update_time = moment(o.update_time).format('YYYY-MM-DD HH:mm:ss');
        o.create_time = create_time;
        o.update_time = update_time;
    })
    function getNodeById(id) {
        let mm = "";
        m.forEach((o,i)=>{
            if(id == o.id){
                mm = o;
                return false;
            }
        })
        return mm;
    }
    function getChildrenNodeById(id) {
        let list = [];
        m.forEach((o,i)=>{
            if(id == o.pid){
                list.push(o);
            }
        })
        return list;
    }
    // p为父菜单节点 o为菜单列表
    function generateTreeNode(id) {
        let root = getNodeById(id);
        root.children = [];
        let childrenTreeNode = getChildrenNodeById(id);

        if(childrenTreeNode.length>0){
            for (let i=0;i<childrenTreeNode.length;i++) {
                let nodes = generateTreeNode(childrenTreeNode[i].id);
                root.children.push(nodes);
            }
        }
        
        return root;
    }
    let classify = generateTreeNode(1);
    res.send(result.httpSuccess(classify));
}))



module.exports = router;