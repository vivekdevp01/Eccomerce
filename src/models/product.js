"use strict";
const { Model } = require("sequelize");
const { Enums } = require("../utils/common");
const { ACTIVE, OUT_OF_STOCK } = Enums.Stock;
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
        // onUpdate: "CASCADE",
      });
    }
  }
  Product.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM,
        values: [ACTIVE, OUT_OF_STOCK],
        defaultValue: ACTIVE,
      },
      stockQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
