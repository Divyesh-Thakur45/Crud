import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  console.log(req.cookies);
  const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Unauthorized");
    } else {
      // verify a token symmetric
      jwt.verify(token, "zxcvbnm", (err, decoded) => {
        if (err) {
          return res.status(403).send("Token is not valid");
        } else {
          // console.log(req);
        //   req.user = decoded.UserData;
          console.log("auth successful");
          next();
        }
      });
    }
};

export { isAuth };
