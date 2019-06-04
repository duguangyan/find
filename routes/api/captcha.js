var svgCaptcha = require('svg-captcha');
let express = require('express');
let router = express.Router();
/**
 * @api {get} /api/captcha/get-img-verify 获取登录验证码
 * @apiDescription 获取登录验证码
 * @apiName get-img-verify
 * @apiGroup captcha
 * @apiParam {Number} [size=4] 验证码长度
 * @apiParam {Number} [width=80] 验证码宽度
 * @apiParam {Number} [height=40] 验证码高度
 * @apiParam {String} [background="#f4f3f2"] 验证码背景
 * @apiParam {Number} [noise=2] 验证码干扰线条数
 * @apiParam {Number} [fontSize=32] 验证码字符大小
 * @apiParam {String} [ignoreChars='0o1i'] 验证码字符中排除
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : "0",  // 状态码
 *      "data": {
 *          img:"<svg xmlns="http://www.w3.org/2000/svg" width="200>"   // svg图片
 *      },
 *      "msg"  : "成功"   // 提示信息
 *  }
 * @apiSampleRequest http://localhost:3001/api/captcha/get-img-verify
 * @apiVersion 1.0.0
 */
router.get('/get-img-verify', function (req, res) {
    console.log(req.query);

    let option = {
        size: req.query.size || 4,  //验证码长度
        width: req.query.width || 80,
        height: req.query.height || 40,
        background: req.query.background || "#f4f3f2",  // 背景颜色
        noise: req.query.noise || 2,//干扰线条数
        fontSize: req.query.fontSize || 32,
        ignoreChars: req.query.ignoreChars || '0o1i',   //验证码字符中排除'0o1i'
        color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    }
    // var option = req.query;
    // 验证码，有两个属性，text是字符，data是svg代码
    var code = svgCaptcha.create(option);
    // 保存到session,忽略大小写
    req.session["code"] = code.text.toLowerCase();
    // 返回数据直接放入页面元素展示即可
    //res.send(code.data);
    res.type('svg'); // 响应的类型
    res.send(code.data);
});









module.exports = router;