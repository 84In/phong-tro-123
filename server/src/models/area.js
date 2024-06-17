"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
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
  Area.init(
    {
      order: DataTypes.INTEGER,
      code: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Area",
    }
  );
  return Area;
};
