const db = require('../config/db')


/**
 * 查询所有任务
 * @returns {Promise<any>}
 */
let show = (page=1,size=10) => {
    return new Promise((resolve, reject) => {
        db.query('select * from o2o_task order by id desc limit '+size*(page-1)+','+size, (err, rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}

/**
 * 根据用户查询任务
 * @returns {Promise<any>}
 */
let select = (uid) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from o2o_task where uid = ${uid} and is_del = 0`, (err, rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}


/**
 * 根据KEY查询任务
 * @returns {Promise<any>}
 */
let selectByOthers = (key,val) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from o2o_task where ${key} = ${val} and is_del = 0`, (err, rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}


/**
 * 插入分类
 * @returns {Promise<any>}
 */
let insert = (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
        let sql = `REPLACE INTO o2o_task ${attributenames} values ${attributes}`;
        db.query(sql, (err,rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}

/**
 * 获取插入分类id
 * @returns {Promise<any>}
 */
let selectInsertId = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT LAST_INSERT_ID();`;
        db.query(sql, (err,rows) => {
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
        db.query('update o2o_task set '+updateattributename+' = "'+newdata+'" where '+attributename+' = "'+attribute+ '"',(err,rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}



/**
 * 根据 id 更新values字段
 * @param id
 * @param values
 * @returns {Promise<any>}
 */
let updateById = (values,id) => {
    return new Promise((resolve, reject) => {
        let sql = `update o2o_task set ${values} where id = ${id}`;
        db.query(sql,(err,rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}

exports.show   = show
exports.select = select
exports.insert = insert
exports.update = update
exports.updateById = updateById
exports.selectInsertId = selectInsertId
exports.selectByOthers = selectByOthers
