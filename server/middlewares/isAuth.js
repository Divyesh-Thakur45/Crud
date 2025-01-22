import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  console.log(req.cookies);
  const { token } = req.cookies;
  console.log(token)
    if (!token) {
      console.log("No token")
      return res.status(401).send("Please Login First !");
    } else {
      console.log("Verifying")
      jwt.verify(token, "zxcvbnm", (err, decoded) => {
        if (err) {
          return res.status(403).send("Token is not valid");
        } else {
          req.user = decoded.UserData;
          console.log("auth successful");
          next();
        }
      });
    }
};

export { isAuth };
