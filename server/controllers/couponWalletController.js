'use strict';
var coupon_wallet = require('../models/index')

coupon_wallet.Users.findOne().then(user => {
  console.log(user.get('name'));
});

exports.list_all_users = function(req, res) {
    coupon_wallet.Users.findAll({}, { raw: true}).then(users => {
        // console.log("in get all" + users.get(0))
        // if (err)
        //     res.send(err);
        // console.log("users" + users[0]);
        // users.map(function(user){ return user.toJSON() });
        // console.log(users.map(function(user){ return user.toJSON() }));
        var result = users.map(function(user){ return user.toJSON() });
        // console.log(res);
        return res.json(result);
    })

};

exports.list_user_specific_coupons = function(req, res) {
    coupon_wallet.Users.findAll({}, { raw: true}).then(users => {
        // console.log("in get all" + users.get(0))
        // if (err)
        //     res.send(err);
        // console.log("users" + users[0]);
        // users.map(function(user){ return user.toJSON() });
        // console.log(users.map(function(user){ return user.toJSON() }));
        var result = users.map(function(user){ return user.toJSON() });
        // console.log(res);
        return res.json(result);
    })

};

exports.add_user = function(req, res){
    console.log(req.body);
    var data = req.body;
    coupon_wallet.Users.create({
        name: data.name, 
        email: data.email,
        phone: data.phone 
    }).then(user => {
        return res.json(user);
    })
}