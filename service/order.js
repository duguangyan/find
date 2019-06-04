const db = require('../config/db')
const common = require('../utils/common')
/**
 * 查询所有order
 * @param attributename
 * @param attribute
 * @returns {Promise<any>}
 */
let show = (page=1,size=10) => {
    return new  Promise((resolve, reject) => {
        db.query('select * from o2o_order order by id desc limit '+size*(page-1)+','+size, (err, rows) => {
            if(err) {
                reject(err);
            }
            let list = rows;
            // resolve(rows);
            db.query('select COUNT(*) from o2o_order',(err,rows)=>{
                if(err) {
                    reject(err);
                }
                resolve({list,total:rows[0]["COUNT(*)"],page,size});
            })

        })
    })
}



/**
 * 根据attributename查询订单
 * @param attributename
 * @param attribute
 * @returns {Promise<any>}
 */
let select = (attributename, attribute) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from o2o_order where ${attributename} = '${attribute}'`, (err, rows) => {
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
        db.query('update o2o_order set '+updateattributename+' = "'+newdata+'" where '+attributename+' = "'+attribute+ '"',(err,rows) => {
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
        let sql = `update o2o_order set ${values} where id = ${id}`;
        db.query(sql,(err,rows) => {
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
        let sql = `REPLACE INTO o2o_order ${attributenames} values ${attributes}`;
        db.query(sql, (err,rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}


/**
 * 新增订单
 * @param attributenames
 * @param attributes
 * @returns {Promise<any>}
 */

let insertWiteDefaultTransaction = (uid,ids, address_id) => {
    return new Promise((resolve, reject) => {
        // 执行多条sql语句，
        var sqlParamsEntity = [];
        ids.forEach((o,i)=>{
            let attributenames = "(uid,tid,address_id,order_sn)";
            let order_sn = common.outTradeNo();
            let attributes = "('" + uid + "','" + o + "','" + address_id + "','" + order_sn  +"')";
            let sql = `insert into o2o_order ${attributenames} values ${attributes}`;
            sqlParamsEntity.push(db._getNewSqlParamEntity(sql))
        })

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

exports.insertWiteDefaultTransaction = insertWiteDefaultTransaction
exports.show = show
exports.select = select
exports.update =  update
exports.updateById =  updateById
exports.insert = insert