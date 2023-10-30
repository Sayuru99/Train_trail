const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function generateJwtToken(user) {
  const token = jwt.sign(
    { userId: user.userID, username: user.Username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
}

function authenticateJwt(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.userType === 0) { //change user type to 1 before deploy
    next();
  } else {
    res.status(403).json({ error: 'Access denied: Admin privileges required' });
    next();
  }
};

module.exports = { generateJwtToken, authenticateJwt, isAdmin };
