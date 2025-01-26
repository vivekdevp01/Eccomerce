const { StatusCodes } = require("http-status-codes");
const { ProductService } = require("../services");

async function createProduct(req, res, next) {
  try {
    const response = await ProductService.createProduct({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      status: req.body.status,
      stockQuantity: req.body.stockQuantity,
      categoryId: req.body.categoryId,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Product created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
async function getProduct(req, res, next) {
  try {
    const response = await ProductService.getProduct(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Product fetched successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
async function getAllProducts(req, res, next) {
  try {
    const response = await ProductService.getAllProducts(req.query);
    console.log(response);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "All products fetched successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
async function updateProduct(req, res, next) {
  try {
    const response = await ProductService.updateproduct(
      req.params.id,
      req.body
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Updated successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
async function destroyProduct(req, res, next) {
  try {
    const response = await ProductService.destroyProduct(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Product deleted successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  destroyProduct,
};
