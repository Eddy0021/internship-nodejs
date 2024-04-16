import { ProductEntity } from '../entities/product.entity';

import {DI} from '../index'

const getAllProducts = async (): Promise<ProductEntity[]> => {
    try {
        const products = await DI.productRepository.findAll();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

const getProductById = async (productId: string): Promise<ProductEntity | undefined> => {
  try {
      const product = await DI.productRepository.findOneOrFail({ id: productId });
      return product;
  } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
  }
};

export default {
    getAllProducts,
    getProductById,
};
