const express = require("express");
const router = express.Router();
import prodController from '../controller/productsController';

// router.get("/", (req, res) => {
//   res.send({ response: "I am alive" }).status(200);
  
// });

router.route('/')
  .get(prodController.getProducts);

router.route('/:id')
  .get(prodController.getProd);

router.route('/addProduct')
  .post(prodController.addProduct);

router.route('/updateProduct')
  .put(prodController.updateProduct);

router.route('/deleteProduct')
  .remove(prodController.deleteProduct);


// export default router;

module.exports = router, prodController;