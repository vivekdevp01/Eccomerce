const CrudRepository = require("./cart-repository");
const { Order, OrderProduct, Product } = require("../models");
const NotFound = require("../errors/notfound");
class OrderRepository extends CrudRepository {
  constructor() {
    super(Order);
  }
  async getOrder(id) {
    try {
      const response = await Order.findByPk(id);

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
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

      if (!response) {
        throw new NotFound(`Order with ID ${id} not found`);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async fetchDetailsOrder(orderId) {
    try {
      const response = await Order.findOne({
        where: {
          id: orderId,
        },
        include: {
          model: Product,
          attributes: ["name", "id", "image", "price"],
          through: {
            model: OrderProduct,
            attributes: ["quantity"],
          },
        },
        attributes: ["id", "status", "createdAt", "updatedAt"],
      });
      if (!response) {
        throw new NotFound(`Order with ID ${orderId} not found`);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = OrderRepository;
