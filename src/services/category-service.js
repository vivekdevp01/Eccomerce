const NotFound = require("../errors/notfound");
const BadRequest = require("../errors/badRequestError");
const { CategoryRepository, ProductRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");

const categoryRepository = new CategoryRepository();
const productRepository = new ProductRepository();

async function createCategory(data) {
  try {
    const response = await categoryRepository.create(data);
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
async function destroyCategory(data) {
  try {
    const response = await categoryRepository.destroy(data);
    return response;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new NotFound("Cannot delete category", data);
    }
    throw error;
  }
}
async function getCategory(data) {
  try {
    const response = await categoryRepository.get(data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new NotFound("Category", data);
    }
    console.log(error);
    throw error;
  }
}
async function getAllCategory() {
  try {
    const response = await categoryRepository.getAll();
    return response;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new NotFound("Cannot fetch all categories", data);
    }
    throw error;
  }
}
async function updateCategory(id, data) {
  try {
    const response = await categoryRepository.update(id, data);
    return response;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new NotFound("Cannot update category", id);
    }
    throw error;
  }
}
async function getProductsForCategory(categoryId) {
  try {
    await categoryRepository.get(categoryId);
    const response = await productRepository.getProductsForCategory(categoryId);
    return response;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new NotFound("Cannot  fetch products", categoryId);
    }
    throw error;
  }
}

module.exports = {
  createCategory,
  destroyCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  getProductsForCategory,
};
