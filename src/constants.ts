/**
 * The SKU enum for the checkout system.
 * @readonly
 * @enum {string}
 */
export const enum SKU {
  ATV = "atv",
  IPD = "ipd",
  MBP = "mbp",
  VGA = "vga",
}

/**
 * The pricing rule type enum for the checkout system.
 * @readonly
 * @enum {string}
 */
export enum PricingRuleTypeEnum {
  BuyXGetYFree = "buyXGetYFree",
  Bulk = "bulk",
  Percentage = "percentage",
}
