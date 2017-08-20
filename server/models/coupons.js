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
    expired: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Coupons;
};