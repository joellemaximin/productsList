const express = require("express");
const router = express.Router();
import * as prodController from '../controller/productsController';

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
  
});

// get an instance of express router
const router = express.Router();
router.route('/')
  .get(prodController.getProducts);
router.route('/:id')
  .get(prodController.getProd);
router.route('/addProduct')
  .post(prodController.addProduct);
export default router;

module.exports = router;