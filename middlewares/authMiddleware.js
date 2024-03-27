import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({ success: false, message: "Unauthorized: Token is missing" });
        }
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in requireSignIn middleware:", error);
        res.status(401).send({ success: false, message: "Unauthorized: Invalid token" });
    }
};

// Admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(401).send({ success: false, message: "Unauthorized: User not found" });
        }
        if (user.role !== 1) {
            return res.status(401).send({ success: false, message: "Unauthorized: Admin access required" });
        }
        next();
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
};
