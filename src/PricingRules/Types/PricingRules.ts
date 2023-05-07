import { PricingRuleTypeEnum, SKU } from "../../constants";

/**
 * Represents a pricing rule that can be applied to a product.
 */
export type PricingRuleType =
  | {
      sku: SKU;
      type: PricingRuleTypeEnum.BuyXGetYFree;
      x: number; // The quantity of products that the customer must buy to get the discount.
      y: number; // The quantity of products that the customer will get free after the discount.
    }
  | {
      sku: SKU;
      type: PricingRuleTypeEnum.Bulk;
      threshold: number; // The minimum quantity of products required to apply the discount.
      discountedPrice: number; // The discounted price for each product after applying the discount.
    }
  | {
      sku: SKU;
      type: PricingRuleTypeEnum.Percentage;
      percentage: number; // The percentage discount to apply to the product.
    };
