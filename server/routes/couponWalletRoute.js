app = require('../app') ();
module.exports = function(app) {
  var coupon_wallet = require('../controllers/couponWalletController');
  app.get('/users', coupon_wallet.list_all_users);
  app.post('/users', coupon_wallet.add_user);
}