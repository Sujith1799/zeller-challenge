import { PricingRuleType } from "./Types/PricingRules";
import Product from "../Product/Product";
import { PricingRuleTypeEnum } from "../constants";

/**
 * A class that represents pricing rules for calculating the price of a product.
 */
export class PricingRules {
  private rules: PricingRuleType[];

  /**
   * Constructs a new PricingRules instance with the given rules.
   * @param rules - The pricing rules to apply when calculating the price of a product.
   */
  constructor(rules: PricingRuleType[]) {
    this.rules = rules;
  }

  /**
   * Calculates the price of the given product based on the pricing rules.
   * @param product - The product for which to calculate the price.
   * @param count - The number of units of the product.
   * @returns The price of the product.
   */
  applyRule(product: Product, count: number): number {
    const pricingRule = this.rules.find((rule) => rule.sku === product.sku);

    if (!pricingRule) {
      return product.price * count;
    }

    switch (pricingRule.type) {
      case PricingRuleTypeEnum.BuyXGetYFree:
        return buyXGetYFree(
          count,
          pricingRule.x!,
          pricingRule.y!,
          product.price
        );
      case PricingRuleTypeEnum.Bulk:
        return bulk(
          count,
          pricingRule.threshold!,
          pricingRule.discountedPrice!,
          product.price
        );
      case PricingRuleTypeEnum.Percentage:
        return percentage(count, pricingRule.percentage!, product.price);
    }
  }
}

/**
 * A helper function that calculates the price for a "buy X pay for Y" pricing rule.
 * @param count - The number of units of the product.
 * @param x - The number of units required to get the discount.
 * @param y - The number of units to get for free.
 * @param price - The price of one unit of the product.
 * @returns The total price of the product with the discount applied.
 */
function buyXGetYFree(
  count: number,
  x: number,
  y: number,
  price: number
): number {
  const bundles = Math.floor(count / x);
  const remainder = count % x;
  const totalPrice = (bundles * (x - y) + remainder) * price;
  return totalPrice;
}

/**
 * A helper function that calculates the price for a "bulk" pricing rule.
 * @param count - The number of units of the product.
 * @param threshold - The number of units required to qualify for the discount.
 * @param discountedPrice - The price of one unit of the product with the discount applied.
 * @param price - The price of one unit of the product.
 * @returns The total price of the product with the discount applied.
 */
function bulk(
  count: number,
  threshold: number,
  discountedPrice: number,
  price: number
): number {
  return count >= threshold ? count * discountedPrice : count * price;
}

/**
 * A helper function that calculates the price for a "percentage" pricing rule.
 * @param count - The number of units of the product.
 * @param percentage - The percentage to be discounted from the price.
 * @param price - The price of one unit of the product.
 * @returns The total price of the product with the discount applied.
 */
function percentage(count: number, percentage: number, price: number): number {
  const discount = (percentage / 100) * price;
  return count * (price - discount);
}

export default PricingRules;
