const { StatusCodes } = require("http-status-codes");
const { CategoryService } = require("../services");

async function createCategory(req, res, next) {
  try {
    const response = await CategoryService.createCategory({
      name: req.body.name,
      description: req.body.description,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Category created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
async function getCategory(req, res, next) {
  try {
    const response = await CategoryService.getCategory(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Category fetched successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
async function getAllCategory(req, res, next) {
  try {
    const response = await CategoryService.getAllCategory();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "All categories fetched successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
async function updateCategory(req, res, next) {
  try {
    const response = await CategoryService.updateCategory(
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
async function destroyCategory(req, res, next) {
  try {
    const response = await CategoryService.destroyCategory(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Category deleted successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  destroyCategory,
};
