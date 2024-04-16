import { ProductEntity } from '../entities/product.entity';
import productRepository from '../repositories/product.repository';

export const getAllProducts = async (): Promise<ProductEntity[]> => {
  return await productRepository.getAllProducts();
};

export const getProductById = async (productId: string): Promise<ProductEntity | undefined | null> => {
  return await productRepository.getProductById(productId);
};

export default {
  getAllProducts,
  getProductById,
};
