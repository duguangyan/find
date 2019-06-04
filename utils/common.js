/**
 * randomWord 产生任意长度随机字母数字组合
 * randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 * xuanfeng 2014-08-28
 * @type
 */
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

function outTradeNo (){
    var outTradeNo="";  //订单号
    for(var i=0;i<6;i++) //6位随机数，用以加在时间戳后面。
    {
        outTradeNo += Math.floor(Math.random()*10);
    }
    return new Date().getTime() + outTradeNo;  //时间戳，用来生成订单号。

}


module.exports = {
    randomWord,
    outTradeNo
};