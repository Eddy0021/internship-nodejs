import { ProductModel } from '../models/product.model';
import { ProductEntity } from '../entities/product.entity';

// Get all products from the database
export const getAllProducts = async (): Promise<ProductEntity[]> => {
  return ProductModel.find().exec();
};

// Get a product by ID from the database
export const getProductById = async (productId: string): Promise<ProductEntity | null> => {
  return ProductModel.findById(productId).exec();
};


export default {
  getAllProducts,
  getProductById
};