let express = require('express');
let router = express.Router();
let loadHttp = require('../../service/load');
let result = require("../../utils/result");
let common = require("../../utils/common");
let fs = require('fs');
let multer = require('multer');
//设置文件上传的public/upload路径
let uploadDir = 'public/upload/';
//规定只上传一张图片 使用single
let upload = multer({dest:uploadDir}).single('img');

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
 * @api {post} /api/common/load 图片上传
 * @apiHeader {String} token token验证登录
 * @apiHeaderExample {json} Request-Example:
 * { "token": "2Wd5wvvxDYUfXrYHbPZh6nTnsF9P8h3P7fh0Il8WT9xavXfOCTK8yyPQSLxl6EaBjYNLZZbCZmt1A8nIlcP0oD3OeIBRTVJG3FdywuPkzxSS" }
 * @apiDescription 图片上传
 * @apiName load
 * @apiGroup Common
 * @apiParam {File} img 图片(必)
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data" : "http://find.du-u.top/public/upload/IYjfYFfCewPVusQC1557382532311.jpg"  // 图片路径
 *      "msg"  : "成功"   // 提示信息
 *  }
 * @apiSampleRequest http://find.du-u.top/api/common/load
 * @apiVersion 1.0.0
 */
router.post('/load',asyncHandler(async (req, res, next) => {
    let fullUrl  = req.protocol + "://" + req.headers.host + "/";
    let des_file = "";
    await upload(req, res, async function(err){
        if(err){
            res.send(result.httpFail(err));
        }else{
            //获取文件的名称，然后拼接成将来要存储的文件路径
            let fileFormat = (req.file.originalname).split(".");
            des_file   = uploadDir + common.randomWord(true,12,24) + Date.now() + "." + fileFormat[fileFormat.length - 1];
            let type = fileFormat[fileFormat.length - 1].toUpperCase();
            if(type!="JPEG"   &&   type!="PNG"   &&   type!="JPG"   &&   type!="GIF"){
                res.send(result.httpFail("请上传正确的图片"));
                return false;
            }
            if(req.file.size > 51200){
                res.send(result.httpFail("请上传小于50M的图片"));
                //删除临时文件
                fs.unlink(req.file.path,function(err){
                    if(err){
                        console.error(err.message);
                    }else{
                        console.log('delete '+req.file.path+' successfully!');
                    }
                });
                return false;
            }
            //读取临时文件
            fs.readFile(req.file.path,function(err,data){
                //将data写入文件中，写一个新的文件
                fs.writeFile(des_file,data,function(err){
                    if(err){
                        res.send(result.httpFail(err));
                    }else{
                        //删除临时文件
                        fs.unlink(req.file.path,function(err){
                            if(err){
                                console.error(err.message);
                            }else{
                                console.log('delete '+req.file.path+' successfully!');
                            }
                        });
                    }
                });
            });
            let attributenames = "(img_url,uid)";
            let userId = req.session.userId;
            let attributes = '("'+ fullUrl+des_file +'","'+  userId +'")';
            await loadHttp.insert(attributenames,attributes);
            res.send(result.httpSuccess(fullUrl+des_file));
        }

    });


}))



module.exports = router;