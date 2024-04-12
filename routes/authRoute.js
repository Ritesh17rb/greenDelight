import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

// Forgot Passowrd || POST

router.post('/forgot-password', forgotPasswordController)

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//User Protected Routes
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//Admin Protected Routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// Update Profile

router.put('/profile', requireSignIn, updateProfileController)

// Orders

router.get('/orders', requireSignIn, getOrdersController)

// All Orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)


// Order status Update

router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController)



export default router;