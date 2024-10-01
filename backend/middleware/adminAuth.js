import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
        }
        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
                }
                return res.status(403).json({ success: false, message: "Invalid token." });
            }

            // Check admin credentials (this assumes the decoded token contains the admin's email/password)
            if (decoded.email !== process.env.ADMIN_EMAIL) {
                return res.status(403).json({ success: false, message: "Not Authorized. Please log in again." });
            }

            // If everything is good, call next()
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default adminAuth;
