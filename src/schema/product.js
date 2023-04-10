import joi from "joi";

export const productSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string(),
  categoryId: joi.string().required(),
});
