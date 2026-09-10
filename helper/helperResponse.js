const superagent = require('superagent');

module.exports.successResponse = function (result, msg) {
    return {
        error: false,
        response: result,
        message: msg
    }
};

module.exports.successMsg = function (result) {
    return {
        error: false,
        message: result
    }
};

module.exports.failResponse = function (result) {
    return {
        error: true,
        response: result
    }
};

module.exports.failMsg = function (result) {
    return {
        error: true,
        message: result
    }
};

// Send SMS
module.exports.sendSMS = function (mobile, message) {

    const smsParam = {
        'AUTH_KEY'          :    'f58f35d57554f41552654aec55e96b',
        'message'           :    message,
        'senderId'          :    'TBTSGN',
        'routeId'           :    1,
        'mobileNos'         :    mobile,
        'smsContentType'    :    'english'
    };
    superagent.get('http://msg.msgclub.net/rest/services/sendSMS/sendGroupSms')
    .query(smsParam)
    .end((err, res) => {
        if (err) { return console.log(err); }
        return res.body;
    });

};