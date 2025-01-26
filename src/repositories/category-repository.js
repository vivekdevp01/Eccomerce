const CrudRepository = require("./crud-repository");
const { Category } = require("../models");
const NotFound = require("../errors/notfound");
class CategoryRepository extends CrudRepository {
  constructor() {
    super(Category);
  }
}
module.exports = CategoryRepository;
