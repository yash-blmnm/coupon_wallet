app = require('../app') ();
module.exports = function(app) {
  var coupon_wallet = require('../controllers/couponWalletController');
  app.get('/users', coupon_wallet.list_all_users);
  app.post('/users', coupon_wallet.add_user);
  app.get('/coupons', coupon_wallet.list_all_coupons);
  app.post('/coupons', coupon_wallet.add_coupon);
}