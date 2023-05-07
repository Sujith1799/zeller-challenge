import Product from "../Product/Product";
import { PricingRules } from "../PricingRules/PricingRules";
import { CartItem } from "./Types/Checkout";

/**
 * A class that represents a shopping cart for scanning and removing products, as well as calculating the total price based on pricing rules.
 */
class Checkout {
  private pricingRules: PricingRules;
  private cart: Map<string, CartItem>;

  /**
   * Constructs a new Checkout instance with the given pricing rules.
   * @param pricingRules - The pricing rules to use for calculating the total price.
   */
  constructor(pricingRules: PricingRules) {
    this.pricingRules = pricingRules;
    this.cart = new Map();
  }

  /**
   * Adds the given product to the cart.
   * @param product - The product to add to the cart.
   */
  scan(product: Product) {
    const item = this.cart.get(product.sku) ?? { product, count: 0 };
    item.count++;
    this.cart.set(product.sku, item);
  }

  /**
   * Removes one unit of the given product from the cart.
   * @param product - The product to remove from the cart.
   */
  remove(product: Product) {
    const item = this.cart.get(product.sku);
    if (item) {
      item.count--;
      if (item.count === 0) {
        this.cart.delete(product.sku);
      }
    }
  }

  /**
   * Removes all units of the given product from the cart.
   * @param product - The product to remove from the cart.
   */
  removeAll(product: Product) {
    this.cart.delete(product.sku);
  }

  /**
   * Empties the cart of all products.
   */
  emptyCart() {
    this.cart.clear();
  }

  /**
   * Calculates the total price of all items in the cart, taking into account any pricing rules.
   * @returns The total price of all items in the cart.
   */
  total(): number {
    let total = 0;
    for (const item of this.cart.values()) {
      total += this.pricingRules.applyRule(item.product, item.count);
    }
    return total;
  }
}

export default Checkout;
