"use strict";
const { Model } = require("sequelize");
const { Enums } = require("../utils/common");
const { ACTIVE, CHECKOUT } = Enums.CART;
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      this.belongsToMany(models.Product, {
        through: models.CartProduct,
        foreignKey: "cartId",
      });
    }
  }
  Cart.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM,
        values: [ACTIVE, CHECKOUT],
        defaultValue: ACTIVE,
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
