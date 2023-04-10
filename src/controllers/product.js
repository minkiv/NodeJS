import category from "../models/category.js";
import Product from "../models/product.js";
import Category from "../models/category.js";
import { productSchema } from "../schema/product.js";
import cloudinary from "../../cloudinaryConfig.js";

export const getAll = async (req, res) => {
  try {
    // const { data: product } = await axios.get(`${API_URI}/products`);
    const product = await Product.find().populate("categoryId");
    // console.log(product);
    if (product === 0) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const get = async (req, res) => {
  try {
    // const { data: product } = await axios.get(
    //   `${API_URI}/products/${req.params.id}`
    // );
    const product = await Product.findById(req.params.id).populate(
      "categoryId"
    );
    if (!product) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json({
      message: "Detail product",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const create = async function (req, res) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    // console.log(req.body);
    const { name, description, price, categoryId } = req.body;

    // const images = req.files.map((file) => file.path);

    // const uploadedImages = [];
    // for (const image of images) {
    //   try {
    //     const result = await cloudinary.uploader.upload(image);
    //     uploadedImages.push({
    //       url: result.secure_url,
    //       publicId: result.public_id,
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // console.log(uploadedImages);
    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
      // images,
    });
    console.log(product);

    // const { data: product } = await axios.post(`${API_URI}/products`, req.body);
    if (!product) {
      return res.json({
        message: "Không thêm được sản phẩm",
      });
    }
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });
    return res.json({
      message: "Thêm sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const update = async function (req, res) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      console.log("🚀 ~ file: product.js:83 ~ update ~ error:", error);
      return error.details[0].message;
    }
    const product = await Product.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (!product) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    return res.json({
      message: "Cập nhật sản phẩm thành công!",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete({ _id: req.params.id });
    console.log("🚀 ~ file: product.js:111 ~ remove ~ product:", product);
    // await axios.delete(`${API_URI}/products/${req.params.id}`);
    res.json({
      message: "Xóa sản phẩm thành công!",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: "uar",
    });
  }
};
