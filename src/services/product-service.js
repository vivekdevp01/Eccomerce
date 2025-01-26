const NotFound = require("../errors/notfound");
const BadRequest = require("../errors/badRequestError");
const { ProductRepository } = require("../repositories");
const { Op } = require("sequelize");

const { StatusCodes } = require("http-status-codes");

const productRepository = new ProductRepository();

async function createProduct(data) {
  try {
    const response = await productRepository.create(data);
    return response;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new BadRequest(explanation);
    }
    console.log(error);
    throw error;
  }
}
async function destroyProduct(data) {
  try {
    const response = await productRepository.destroy(data);
    return response;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new NotFound("Cannot delete product", data);
    }
    throw error;
  }
}
async function getProduct(data) {
  try {
    const response = await productRepository.get(data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new NotFound("Product", data);
    }
    console.log(error);
    throw error;
  }
}
async function getAllProducts(query) {
  let customFilter = {};
  let sortFilter = [];
  const page = query.page ? parseInt(query.page, 10) : 1;
  const limit = query.limit ? parseInt(query.limit, 10) : 10;
  const offset = (page - 1) * limit;
  if (query.limit && isNaN(query.limit)) {
    throw new BadRequest("ValidationError", "Limit must be number");
  }
  if (query.name) {
    customFilter.name = { [Op.like]: `%${query.name}%` };
  }
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 1000000 : maxPrice],
    };
  }
  if (query.sort) {
    const params = query.sort.split(",");
    const sortFilters = params.map((param) => param.split("_"));
    sortFilter = sortFilters;
  }
  if (query.minStock) {
    customFilter.stockQuantity = { [Op.gte]: query.minStock };
  }

  try {
    const response = await productRepository.getAllProducts(
      customFilter,
      sortFilter,
      limit,
      offset
    );
    return response;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new NotFound("Cannot fetch all products", data);
    }
    throw error;
  }
}
async function updateproduct(id, data) {
  try {
    const response = await productRepository.update(id, data);
    return response;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new NotFound("Cannot update product", id);
    }
    throw error;
  }
}

module.exports = {
  createProduct,
  destroyProduct,
  getProduct,
  getAllProducts,
  updateproduct,
};
