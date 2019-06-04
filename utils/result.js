/**
 * json返回值   code  1:成功 0：失败
 * @type
 */
let result = {
    result:(code,data,msg)=>{
        return {code,data,msg}
    },
    httpSuccess:(data)=>{
        return {code:0,data,msg:"成功"}
    },
    httpFail:(msg)=>{
        return {code:1,data:null,msg:msg||"失败"}
    },
    httpErr:(data,msg)=>{
        return {code:1,data,msg:msg||"失败"}
    }
};


module.exports = result;