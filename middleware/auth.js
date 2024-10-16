const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    // Verify the token
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        // Attach user info to request
        req.user = user; // user contains { id: user._id, role: user.role }
        next(); // Pass control to the next middleware/route handler
    });
};



const authenticateAdmin = (req, res, next) => {
    // Check if user is authenticated and has admin role
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next(); // Pass control to the next middleware or route handler
};



module.exports = {authenticateToken , authenticateAdmin};

