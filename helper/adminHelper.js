"user strict";
var sql = require("../config/db.config");
const path = require('path');

module.exports = {

    getUid: function (Uid) {
        let query_string = "select * from m03_user_detail where or_m_reg_id = ?";
        let param = Uid;
        return new Promise((resolve, reject) => {
            sql.query(query_string, param, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        })
    },

    GetBookingNo: function () {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        return (year + month + date + hours + minutes + seconds + (Math.floor(Math.random() * (9999 - 1000)) + 1000));
    },

    getDate: function () {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        return (year + '-' + month + '-' + date);
    },

    getTime: function () {
        let date_ob = new Date();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        return (hours + ':' + minutes + ':' + seconds);
    },

    getDatetime: function () {
        let date_ob = new Date();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        return (year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds);
    },

    queryDb: function (query, param) {
        return new Promise((resolve, reject) => {
            sql.query(query, param, (err, result) => {
                if (err) {
                    //return reject(err);
                    return console.log(err);
                }
                resolve(result);
            });
        })
    },

}