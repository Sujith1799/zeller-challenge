import PricingRules from "./PricingRules";
import { PricingRuleType } from "./Types/PricingRules";
import { PricingRuleTypeEnum, SKU } from "../constants";

/**
 * An array of pricing rules for the checkout system.
 * @type {PricingRuleType[]}
 */
const rules: PricingRuleType[] = [
  {
    sku: SKU.ATV,
    type: PricingRuleTypeEnum.BuyXGetYFree,
    x: 3,
    y: 1,
  },
  {
    sku: SKU.IPD,
    type: PricingRuleTypeEnum.Bulk,
    threshold: 4,
    discountedPrice: 499.99,
  },
];

const pricingRules = new PricingRules(rules);

export default pricingRules;
