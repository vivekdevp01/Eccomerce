"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product, {
        foreignKey: "categoryId",
      });
      // define association here
    }
  }
  Category.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
