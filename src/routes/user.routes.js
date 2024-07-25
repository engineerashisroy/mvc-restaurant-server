import { Router } from "express";
import { demoRegister } from "../controllers/demo.controllers.js";
import {
  menuItem,
  menuItemDelete,
  menuItemGetById,
  menuItemPost,
} from "../controllers/menu.controllers.js";
import { reviewsController } from "../controllers/reviews.controllers.js";
import {
  cartController,
  cartGetController,
  cartItemDeleteController,
} from "../controllers/cart.controllers.js";
import {
  userAdminController,
  userAdminOrNotController,
  userDeleteController,
  userGetController,
  usersController,
} from "../controllers/users.controllers.js";
import tokenController from "../controllers/jwt.controller.js";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

//api token calling api
router.route("/jwt").post(tokenController);

router.route("/demo").get(demoRegister);

//menu route
//get all menu
router.route("/menu").get(menuItem);
router.route("/menu").post(verifyJWT, verifyAdmin, menuItemPost);
router.route("/menu/:id").delete(verifyJWT, verifyAdmin, menuItemDelete);
router.route("/menu/:id").get(verifyJWT, verifyAdmin, menuItemGetById);

//reviews route
router.route("/reviews").get(reviewsController);

//cart  route
router.route("/carts").post(cartController);
router.route("/carts").get(cartGetController);
//delete cart item
router.route("/carts/:id").delete(cartItemDeleteController);
//users route
router.route("/users").post(usersController);
router.route("/users").get(verifyJWT, verifyAdmin, userGetController);
router.route("/users/admin/:email").get(verifyJWT, userAdminOrNotController);
// admin related api
router.route("/users/:id").delete(verifyJWT, verifyAdmin, userDeleteController);
router
  .route("/users/admin/:id")
  .patch(verifyJWT, verifyAdmin, userAdminController);
export default router;
