var mysql = require("mysql")
var async = require("async");
console.log(process.env.NODE_ENV);
var data;
if (process.env.NODE_ENV === 'dev') {
    data = {
        host:"120.77.221.28",
        user:"jv_du_u_top",
        password:"duguangyan2010",
        database:"jv_du_u_top"
    }
} else if(process.env.NODE_ENV === 'pro')  {
    data = {
        host:"120.77.221.28",
        user:"nd_du_u_top",
        password:"duguangyan2010",
        database:"nd_du_u_top"
    }
}else{
    data = {
        host:"120.77.221.28",
        user:"jv_du_u_top",
        password:"duguangyan2010",
        database:"jv_du_u_top"
    }
}


var pool = mysql.createPool(data)//数据库连接配置
function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows)
            connection.release()
        })
    })
}//对数据库进行增删改查操作的基础

// 事务管理
function execTrans(sqlparamsEntities, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return callback(err, null);
        }
        connection.beginTransaction(function (err) {
            if (err) {
                return callback(err, null);
            }
            //console.log("开始执行transaction，共执行" + sqlparamsEntities.length + "条数据");
            var funcAry = [];
            sqlparamsEntities.forEach(function (sql_param) {
                var temp = function (cb) {
                    var sql = sql_param.sql;
                    var param = sql_param.params;
                    connection.query(sql, param, function (tErr, rows, fields) {
                        if (tErr) {
                            connection.rollback(function () {
                                console.log("事务失败，" + sql_param + "，ERROR：" + tErr);
                                return callback(tErr, null);
                            });
                        } else {
                            return cb(null, rows);
                        }
                    })
                };
                funcAry.push(temp);
            });

            async.series(funcAry, function (err, result) {
                if (err) {
                    connection.rollback(function (err) {
                        console.log("transaction error: " + err);
                        connection.release();
                        return callback(err, null);
                    });
                } else {
                    connection.commit(function (err, info) {
                        //console.log("transaction info: " + JSON.stringify(info));
                        if (err) {
                            console.log("执行事务失败，" + err);
                            connection.rollback(function (err) {
                                console.log("transaction error: " + err);
                                connection.release();
                                return callback(err, null);
                            });
                        } else {
                            connection.release();
                            return callback(null, result);
                        }
                    })
                }
            })
        });
    });
}


//初始化sql & params：
function _getNewSqlParamEntity(sql, params, callback) {
    if (callback) {
        return callback(null, {
            sql: sql,
            params: params
        });
    }
    return {
        sql: sql,
        params: params
    };
}

exports.query = query
exports.execTrans = execTrans

exports._getNewSqlParamEntity = _getNewSqlParamEntity