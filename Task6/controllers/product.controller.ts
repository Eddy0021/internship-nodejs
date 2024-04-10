import { Request, Response } from 'express';

import productService from '../services/product.service';

import { sendApiResponse } from '../helpers/response'

export const getAllProductsHandler = async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();

  sendApiResponse(res, 200, products, null)
};

export const getProductByIdHandler = async (req: Request, res: Response) => {
    const productId = req.url.split('/')[1];

    const product = await productService.getProductById(productId);

    if (!product) {     
      return sendApiResponse(res, 404, null, 'No product with such id');
    }

    sendApiResponse(res, 200, product, null);
};

export default {
  getAllProductsHandler,
  getProductByIdHandler,
};
