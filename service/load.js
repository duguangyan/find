const db = require('../config/db')

/**
 * 上传图片
 * @param attributenames
 * @param attributes
 * @returns {Promise<any>}
 */
let insert = (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
        db.query(`insert into o2o_images_upload ${attributenames} values ${attributes}`, (err,rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}



exports.insert = insert
