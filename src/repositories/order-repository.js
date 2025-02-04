const CrudRepository = require("./cart-repository");
const { Order, OrderProduct } = require("../models");
class OrderRepository extends CrudRepository {
  constructor() {
    super(Order);
  }
  async createOrder(userId, status) {
    try {
      const order = await Order.create({
        userId,
        status,
      });
      return order;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async addOrderProductInBulk(orderProducts) {
    try {
      const response = await OrderProduct.bulkCreate(orderProducts);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = OrderRepository;
