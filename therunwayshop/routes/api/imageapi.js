const router = require("express").Router();
const imageController = require("../../controllers/imagecontroller");

// Matches with "/api/imageapi"
router.route("/")
  .get(imageController.findAll)
  .post(imageController.create);

// Matches with "/api/imageapi/:id"
router
  .route("/:id")
  .get(imageController.findById)
  .put(imageController.update)
  .delete(imageController.remove);

module.exports = router;