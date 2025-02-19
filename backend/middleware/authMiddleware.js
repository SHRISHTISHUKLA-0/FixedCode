import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.jwt; // Ensure cookies are being parsed correctly
    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET); // Use process.env
        req.user = verified;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid Token" }); // 403 for authentication failure
    }
};

export default authMiddleware;