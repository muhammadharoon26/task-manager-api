import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];
    console.log("Received Token:", token); // Debug log

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        console.log("Decoded Token:", decoded); // Debug log
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        res.status(401).json({ message: 'Token is invalid' });
    }
};

export default authMiddleware;
