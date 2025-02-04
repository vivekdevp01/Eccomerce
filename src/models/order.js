"use strict";
const { Model } = require("sequelize");
const Enums = require("../utils/common/enum");
const { PENDING, CANCELLED, COMPLETED } = Enums.Order;

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
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
        // onUpdate: "CASCADE",
      });
      this.belongsToMany(models.Product, {
        through: models.OrderProduct,
        foreignKey: "orderId",
      });
    }
  }
  Order.init(
    {
      status: {
        type: DataTypes.ENUM,
        values: [PENDING, CANCELLED, COMPLETED],
        defaultValue: PENDING,
      },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
