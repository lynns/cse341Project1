var request = require('request');

const fetchUserMiddleware = (req, res, next) => {
    var options = {
        method: 'GET',
        url: req.auth.payload.iss + 'userinfo',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${req.auth.token}`
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        req.userInfo = body;
        next();
    });
};

module.exports = {
    fetchUserMiddleware
};
