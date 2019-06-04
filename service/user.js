const db = require('../config/db')
/**
 * 查询所有用户
 * @param attributename
 * @param attribute
 * @returns {Promise<any>}
 */
let show = (page=1,size=10) => {
    return new  Promise((resolve, reject) => {
        db.query('select id,name,mobile,photo,token,create_time,update_time from o2o_user where is_del=0  order by id desc limit '+size*(page-1)+','+size, (err, rows) => {
            if(err) {
                reject(err);
            }
            let list = rows;
            // resolve(rows);
            db.query('select COUNT(*) from o2o_user where is_del=0',(err,rows)=>{
                if(err) {
                    reject(err);
                }
                resolve({list,total:rows[0]["COUNT(*)"],page,size});
            })

        })
    })
}




/** 根据attributename查询用户
 * @param attributename
 * @param attribute
 * @returns {Promise<any>}
 */
let select = (attributename, attribute) => {
    return new Promise((resolve, reject) => {
        let sql = `select id,name,mobile,photo,token,create_time,update_time from o2o_user where is_del = 0 and ${attributename} = '${attribute}'`;
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
        db.query('update o2o_user set '+updateattributename+' = "'+newdata+'" where '+attributename+' = "'+attribute+ '"',(err,rows) => {
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
let updateByPassword= (password,id) => {
    return new Promise((resolve, reject) => {
        db.query('update o2o_user set password = "'+password+'" where id = "'+id+ '"',(err,rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}




/**
 * 新增用户
 * @param attributenames
 * @param attributes
 * @returns {Promise<any>}
 */
let insert = (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
        db.query(`insert into o2o_user ${attributenames} values ${attributes}`, (err,rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}


/** 根据attributename查询用户
 * @param attributename
 * @param attribute
 * @returns {Promise<any>}
 */
let login = (name, password) => {
    return new Promise((resolve, reject) => {
        let sql = `select id,name,mobile,photo,token,create_time,update_time from o2o_user where is_del = 0 and name = "${name}" and password = '${password}'`;
        console.log(sql);
        db.query(sql, (err, rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}



exports.show   = show
exports.select = select
exports.update =  update
exports.insert = insert
exports.login  = login

exports.updateByPassword  = updateByPassword
