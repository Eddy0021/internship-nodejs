import { ProductEntity } from '../entities/product.entity';

export const products: ProductEntity[] = [
  {
    id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
    title: 'Book',
    description: 'A very interesting book',
    price: 100
  },
  {
    id: 'daaa9a80-d005-4069-bbac-b8323aa1a140',
    title: 'Ball',
    description: 'Ball for basketball',
    price: 200
  },
  {
    id: '079d922a-bca0-4745-b427-ab1b3979b636',
    title: 'T-Shirt',
    description: 'White T-Shirt',
    price: 500
  },
]
  
export const getAllProducts = async (): Promise<ProductEntity[]> => {
  return products;
};

export const getProductById = async (productId: string): Promise<ProductEntity | undefined> => {
  return products.find(product => product.id === productId);
};
  
  
  export default {
    getAllProducts,
    getProductById,
  };
  