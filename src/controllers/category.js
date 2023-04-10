import { categorySchema } from "../schema/category.js";
import Category from "../models/category.js";
import Product from "../models/product.js";

export const getAll = async (req, res) => {
  try {
    const category = await Category.find();
    // console.log(category);
    if (category.length === 0) {
      return res.json({
        message: "Không có danh mục nào",
      });
    }
    return res.json(category);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    if (!category) {
      return res.json({
        message: "Không có danh mục nào",
      });
    }

    // const products = await Product.find({ categoryId: req.params.id });
    // return res.json({ ...category.toObject(), products });
    return res.json(category);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const create = async function (req, res) {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const category = await Category.create(req.body);
    console.log(category);

    if (!category) {
      return res.json({
        message: "Không thêm được danh mục",
      });
    }
    return res.json({
      message: "Thêm danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const update = async function (req, res) {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      console.log("🚀 ~ file: product.js:83 ~ update ~ error:", error);
      return error.details[0].message;
    }
    const category = await Category.updateOne(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!category) {
      return res.json({
        message: "Cập nhật danh mục không thành công",
      });
    }
    return res.json({
      message: "Cập nhật danh mục thành công!",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete({ _id: req.params.id });
    console.log("🚀 ~ file: product.js:111 ~ remove ~ product:", category);
    // await axios.delete(`${API_URI}/products/${req.params.id}`);
    res.json({
      message: "Xóa danh mục thành công!",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
