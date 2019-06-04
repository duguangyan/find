const db = require('../config/db')

/**
 * 查询所有用户地址
 * @returns {Promise<any>}
 */
let show = (page=1,size=10) => {
    return new  Promise((resolve, reject) => {
        db.query('select * from o2o_address where is_del=0  order by id desc limit '+size*(page-1)+','+size, (err, rows) => {
            if(err) {
                reject(err);
            }
            let list = rows;
            // resolve(rows);
            db.query('select COUNT(*) from o2o_address where is_del=0',(err,rows)=>{
                if(err) {
                    reject(err);
                }
                resolve({list,total:rows[0]["COUNT(*)"],page,size});
            })

        })
    })
}




/** 根据attributename查询地址
 * @param attributename
 * @param attribute
 * @returns {Promise<any>}
 */
let select = (attributename, attribute) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from o2o_address where is_del = 0 and ${attributename} = '${attribute}'`;
        console.log(sql);
        db.query(sql, (err, rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}


/** 根据id,uid查询地址
 * @param attributename
 * @param attribute
 * @returns {Promise<any>}
 */
let selectByIdAndUid = (id, uid) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from o2o_address where is_del = 0 and id = ${id} and uid = ${uid}`;
        console.log(sql);
        db.query(sql, (err, rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}


/** 根据attributename更新最后一次插入的地址
 * @param attributename
 * @param attribute
 * @returns {Promise<any>}
 */
let updateByLastDefault = () => {
    return new Promise((resolve, reject) => {
        let sql = `update o2o_address set is_default = 1 where is_del = 0 order by id DESC limit 1`;
        console.log(sql);
        db.query(sql, (err, rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}




/**
 * 根据 attributename 更新updateattributename字段
 * @param updateattributename
 * @param newdata
 * @param attributename
 * @param attribute
 * @returns {Promise<any>}
 */
let update = (updateattributename, newdata,attributename,attribute) => {
    return new Promise((resolve, reject) => {
        db.query('update o2o_address set '+updateattributename+' = "'+newdata+'" where '+attributename+' = "'+attribute+ '"',(err,rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}


/**
 * 根据id更新地址
 * @param values sql语句
 * @param id  地址ID
 * @returns {Promise<any>}
 */
let updateById = (values, id) => {
    return new Promise((resolve, reject) => {
        let sql = `update o2o_address set ${values} where id=${id} and is_del = 0`;
        db.query(sql,(err,rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}


/**
 * 新增地址
 * @param attributenames
 * @param attributes
 * @returns {Promise<any>}
 */
let insert = (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
        db.query(`insert into o2o_address ${attributenames} values ${attributes}`, (err,rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}

/**
 * 新增地址
 * @param attributenames
 * @param attributes
 * @returns {Promise<any>}
 */

let insertWiteDefaultTransaction = (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
        // 执行多条sql语句，
        var sqlParamsEntity = [];
        var sql = `update o2o_address set is_default = 0 where is_default = 1`;
        sqlParamsEntity.push(db._getNewSqlParamEntity(sql));
        sql = `insert into o2o_address ${attributenames} values ${attributes}`;
        sqlParamsEntity.push(db._getNewSqlParamEntity(sql))

        db.execTrans(sqlParamsEntity, function(err, info){
            if(err){
                reject(err);
                // console.log("事务执行失败");
            }else{
                // console.log("事务执行成功");
                resolve(info);
            }
        });
    })
}


/**
 * 根据id更新地址（设置默认地址）
 * @param values sql语句
 * @param id  地址ID
 * @returns {Promise<any>}
 */
let updateByIdWiteTransaction = (values, id) => {
    return new Promise((resolve, reject) => {
        //如果你要执行多条sql语句，
        var sqlParamsEntity = [];
        var sql = `update o2o_address set is_default = 0 where is_default=1 and is_del = 0`;
        sqlParamsEntity.push(db._getNewSqlParamEntity(sql));
        sql = `update o2o_address set ${values} where id=${id} and is_del = 0`;
        sqlParamsEntity.push(db._getNewSqlParamEntity(sql))

        db.execTrans(sqlParamsEntity, function(err, info){
            if(err){
                reject(err);
                //console.error("事务执行失败");
            }else{
                // console.log("done.");
                resolve(info);
            }
        });


    })
}





/**
 * 设置默认地址
 * @param attributenames
 * @param attributes
 * @returns {Promise<any>}
 */

let updateIsDefaultWiteDefaultTransaction = (id,uid) => {
    return new Promise((resolve, reject) => {
        // 执行多条sql语句，
        var sqlParamsEntity = [];
        var sql = `update o2o_address set is_default = 0 where is_default = 1 and uid = ${uid}`;
        sqlParamsEntity.push(db._getNewSqlParamEntity(sql));
        sql = `update o2o_address set is_default = 1 where id=${id} and is_del = 0 and uid = ${uid}`;
        sqlParamsEntity.push(db._getNewSqlParamEntity(sql))

        db.execTrans(sqlParamsEntity, function(err, info){
            if(err){
                reject(err);
                // console.log("事务执行失败");
            }else{
                // console.log("事务执行成功");
                resolve(info);
            }
        });
    })
}




exports.show   = show
exports.select = select
exports.update = update
exports.insert = insert
exports.updateByLastDefault = updateByLastDefault
exports.updateById          = updateById
exports.selectByIdAndUid    = selectByIdAndUid
exports.insertWiteDefaultTransaction = insertWiteDefaultTransaction
exports.updateByIdWiteTransaction    = updateByIdWiteTransaction
exports.updateIsDefaultWiteDefaultTransaction    = updateIsDefaultWiteDefaultTransaction










