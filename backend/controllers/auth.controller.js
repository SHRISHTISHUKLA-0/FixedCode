import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
export const register = async (req, res) => {
    try {
    const { name, email, password } = req.body;

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        console.log("Received login request:", req.body); // ✅ Log incoming data

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");  // ✅ Log missing user
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // ✅ Fix bcrypt (add await)
        const validPassword = await bcrypt.compare(password, user.password);
        console.log("Password Valid:", validPassword); // ✅ Log password check

        if (!validPassword) {
            console.log("Invalid password");  // ✅ Log wrong password
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        console.log("Generated Token:", token); // ✅ Log token

        res.cookie("jwt", token, { httpOnly: true, secure: false }); // ✅ Set Cookie
        res.json({ message: "Login successful" });

    } catch (err) {
        console.error("Login Error:", err);  // ✅ Log backend errors
        res.status(500).json({ message: "Server error" });
    }
};
