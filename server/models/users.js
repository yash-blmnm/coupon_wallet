'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    authkey: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};