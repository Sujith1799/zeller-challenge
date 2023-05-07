import { SKU } from "../constants";

/**
 * Represents a product with a SKU, name, and price.
 */
interface IProduct {
  sku: SKU;
  name: string;
  price: number;
}

/**
 * A class that implements the `IProduct` interface and represents a product.
 */
class Product implements IProduct {
  /**
   * Creates a new instance of the `Product` class.
   * @param sku The SKU of the product.
   * @param name The name of the product.
   * @param price The price of the product.
   * @throws An error if price is less than or equal to zero.
   */
  constructor(public sku: SKU, public name: string, public price: number) {
    if (price <= 0) {
      throw new Error("Price must be greater than zero");
    }
  }
}

export default Product;
