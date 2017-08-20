'use strict';
module.exports = function(sequelize, DataTypes) {
  var Coupons = sequelize.define('Coupons', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    provider: DataTypes.STRING,
    code: DataTypes.STRING,
    info: DataTypes.STRING,
    validity: DataTypes.STRING,
    expired: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Coupons.hasMany(models.CouponTracker, {foreignKey: 'coupon_id'})
      }
    }
  });
  return Coupons;
};