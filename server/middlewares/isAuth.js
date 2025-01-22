import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }
  jwt.verify(token, "zxcvbnm", (err, decoded) => {
    if (err) {
      return res.status(403).send("Token is invalid");
    }
    req.user = decoded.UserData; // Pass user data to the next middleware
    console.log("Authorization successful");
    next();
  });
};

export { isAuth };
