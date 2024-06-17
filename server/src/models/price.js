"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   User.hasMany(models.Post, {
      //     foreignKey: "userId",
      //     as: "user",
      //   });
    }
  }
  Price.init(
    {
      order: DataTypes.INTEGER,
      code: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Price",
    }
  );
  return Price;
};
