import ProductModel from "../models/product.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const CreateProduct = async (req, res) => {
  const { email, password, gender, age, language, hobbies, date, userId } =
    req.body;

  if (
    !email ||
    !password ||
    !gender ||
    !age ||
    !language ||
    !date ||
    !hobbies
  ) {
    console.log("Please select all required");
    return res.status(400).send("Please select all required");
  }
  const isExist = await ProductModel.findOne({ email });
  try {
    if (isExist) {
      console.log("User already exists");
      return res.status(400).send("Email already exists");
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error hashing password");
      } else {
        await ProductModel.create({
          image: req.file
            ? req.file.originalname // If file is uploaded, use the uploaded file's name
            : "data:image/png;base64,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",
          email,
          password: hash,
          gender,
          age,
          language,
          hobbies,
          date,
          userId,
        });
        res
          .status(201)
          .send({ message: "Product created successfully", success: true });
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "Error creating products", success: false });
  }
};

const SignIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Please select");
    return res.status(400).send("Email and password are required");
  }
  try {
    const isUser = await ProductModel.findOne({ email });
    if (!isUser) {
      console.log("User not found");
      return res.status(400).send("Invalid email");
    }
    bcrypt.compare(password, isUser.password, async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error comparing password");
      } else if (!result) {
        console.log("Incorrect password");
        return res.status(400).send("Incorrect password");
      } else {
        jwt.sign({ UserData: isUser }, "zxcvbnm", async (err, token) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error generating token");
          } else {
            res
              .cookie("token", token, {
                httpOnly: true,
                secure: true, // Set to true if using HTTPS
                sameSite: "None",
              })
              .status(200)
              .json({
                message: "Login Successfully !",
                UserData: isUser,
                success: true,
              });
            console.log("User signed in successfully");
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Error creating products", success: false });
  }
};

const DeleteProducts = async (req, res) => {
  const { ProductId } = req.params;
  try {
    await ProductModel.findByIdAndDelete(ProductId);
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(404).send("Error deleting products");
  }
};

const GetAllProducts = async (req, res) => {
  const { userId } = req.params;
  try {
    const products = await ProductModel.find({ userId: userId });
    if (products.length > 0) {
      res.status(200).send({ message: products });
      console.log(products);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Error getting all products");
  }
};

const GetOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (product) {
      res.status(200).send({ message: product });
      console.log(product);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Error getting one product");
  }
};

const UpdateProduct = async (req, res) => {
  const { email, password, gender, age, date } = req.body;
  if (!email || !password || !gender || !age || !date) {
    console.log("Please select all required");
    return res.status(400).send("Please select all required");
  }
  const { ProductId } = req.params;
  console.log(req.file);
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      ProductId,
      {
        ...req.body,
        image: req.file?.originalname,
      },
      {
        new: true,
      }
    );
    res.status(200).send({ message: updatedProduct, success: true });
    console.log(updatedProduct);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "Error updating products", success: false });
  }
};

export {
  CreateProduct,
  SignIn,
  DeleteProducts,
  GetAllProducts,
  GetOneProduct,
  UpdateProduct,
};
