'use strict';
module.exports = function(sequelize, DataTypes) {
  var CouponTracker = sequelize.define('CouponTracker', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    coupon_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    availed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        CouponTracker.belongsTo(models.Users, { foreignKey: 'user_id'})
        CouponTracker.belongsTo(models.Coupons, { foreignKey: 'coupon_id'})
      }
    }
  });
  return CouponTracker;
};