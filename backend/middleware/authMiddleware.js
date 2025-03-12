import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function isAdmin(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized: Admins only" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Admin check error:", error);
    res.status(403).json({ message: "Unauthorized" });
  }





  
}
