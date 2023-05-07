import Product from "../../Product/Product";

/**
 * An interface that defines the structure of an object that contains a product and a count representing the number of units of that product in a shopping cart.
 */
export interface CartItem {
  /**
   * The product in the cart item.
   */
  product: Product;

  /**
   * The number of units of the product in the cart item.
   */
  count: number;
}
