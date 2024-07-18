import { Router } from "express";
import { demoRegister } from "../controllers/demo.controllers.js";
import { menuItem } from "../controllers/menu.controllers.js";
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
import verifyJWT from "../middlewares/auth.middlewares.js";

const router = Router();

//api token calling api
router.route("/jwt").post(tokenController);
//get route
router.route("/demo").get(demoRegister);
router.route("/menu").get(menuItem);
router.route("/reviews").get(reviewsController);

//post route
router.route("/carts").post(cartController);
router.route("/carts").get(cartGetController);
//delete cart item
router.route("/carts/:id").delete(cartItemDeleteController);
//users route
router.route("/users").post(usersController);
router.route("/users").get(userGetController);
router.route("/users/admin/:email").get(userAdminOrNotController);
// admin related api
router.route("/users/:id").delete(userDeleteController);
router.route("/users/admin/:id").patch(userAdminController);
export default router;
