const CrudRepository = require("./crud-repository");
const { Product } = require("../models");
const NotFound = require("../errors/notfound");
class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }
  async getProductsForCategory(categoryId) {
    try {
      const response = await Product.findAll({
        where: {
          categoryId: categoryId,
        },
      });
      if (!response) {
        throw new NotFound("Product not found", categoryId);
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getAllProducts(filter, sort, limit, offset) {
    const response = await Product.findAll({
      where: filter,
      order: sort,
      limit,
      offset,
    });
    return response;
  }
}
module.exports = ProductRepository;
