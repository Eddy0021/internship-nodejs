import { Request, Response } from 'express';

import productService from '../services/product.service';

import { errorHandler } from "../helpers/errorResponse"

export const getAllProductsHandler = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ data: products });
  } catch (error) {
    errorHandler(res, "Error getting all products:", error);
  }
};

export const getProductByIdHandler = async (req: Request, res: Response) => {
  try {
    const productId = req.url.split('/')[1];
    const product = await productService.getProductById(productId);

    if (!product) {  
      res.status(404).json({ error: 'No product with such id' });   
      return;
    }

    res.status(200).json({ data: product });
  } catch (error) {
    errorHandler(res, "Error getting product by id:", error);
  }
};

export default {
  getAllProductsHandler,
  getProductByIdHandler,
};
