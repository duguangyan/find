const db = require('../config/db')

/**
 * 查询分类
 * @returns {Promise<any>}
 */
let select = () => {
    return new Promise((resolve, reject) => {
        db.query(`select * from o2o_classify`, (err, rows) => {
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
        db.query(`insert into o2o_classify ${attributenames} values ${attributes}`, (err,rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}


exports.select = select
exports.insert = insert
