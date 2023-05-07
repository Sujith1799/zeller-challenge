import { PricingRuleType } from "PricingRules/Types/PricingRules";
import PricingRules from "../src/PricingRules/PricingRules";
import Product from "../src/Product/Product";
import { PricingRuleTypeEnum, SKU } from "../src/constants";

describe("PricingRules", () => {
  const rules: PricingRuleType[] = [
    {
      sku: SKU.IPD,
      type: PricingRuleTypeEnum.BuyXGetYFree,
      x: 4,
      y: 1,
    },
    {
      sku: SKU.MBP,
      type: PricingRuleTypeEnum.Bulk,
      threshold: 3,
      discountedPrice: 1000,
    },
    {
      sku: SKU.ATV,
      type: PricingRuleTypeEnum.BuyXGetYFree,
      x: 3,
      y: 1,
    },
    {
      sku: SKU.VGA,
      type: PricingRuleTypeEnum.Percentage,
      percentage: 50,
    },
  ];
  const pricingRules = new PricingRules(rules);

  describe("applyRule", () => {
    it("should return the price of a product when no pricing rule is applicable", () => {
      const product = new Product(SKU.IPD, "Super iPad", 549.99);
      const count = 1;

      const price = pricingRules.applyRule(product, count);

      expect(price).toBe(product.price * count);
    });

    it("should apply the 'buy X get Y for free' pricing rule correctly", () => {
      const product = new Product(SKU.IPD, "Super iPad", 549.99);

      // Buy 4 iPads get 1 free
      const count = 4;
      const expectedPrice = pricingRules.applyRule(product, count);
      expect(expectedPrice).toBe(product.price * 3);

      // Buy 5 iPads, get 1 free
      const count2 = 5;
      const expectedPrice2 = pricingRules.applyRule(product, count2);
      expect(expectedPrice2).toBe(product.price * 4);
    });

    it("should apply the 'bulk' pricing rule correctly", () => {
      const product = new Product(SKU.MBP, "MacBook Pro", 1399.99);

      // Buy 2 MacBook Pros, pay full price.
      const count = 2;
      const expectedPrice = pricingRules.applyRule(product, count);
      expect(expectedPrice).toBe(product.price * count);

      // Buy 3 MacBook Pros, pay discounted price.
      const count2 = 3;
      const expectedPrice2 = pricingRules.applyRule(product, count2);
      expect(expectedPrice2).toBe(1000.0 * count2);
    });

    it("should apply the 'percentage' pricing rule correctly", () => {
      const product = new Product(SKU.VGA, "VGA adapter", 30.0);

      // Buy 1 VGA adapter, get 50% off.
      const count = 1;
      const expectedPrice = pricingRules.applyRule(product, count);
      expect(expectedPrice).toBe(product.price * count * 0.5);
    });
  });
});
