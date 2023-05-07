import Product from "../src/Product/Product";
import { PricingRules } from "../src/PricingRules/PricingRules";
import Checkout from "../src/Checkout/Checkout";
import { PricingRuleTypeEnum, SKU } from "../src/constants";
import { PricingRuleType } from "../src/PricingRules/Types/PricingRules";

describe("Checkout", () => {
  let pricingRules: PricingRules;
  let checkout: Checkout;

  beforeEach(() => {
    pricingRules = new PricingRules([
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
    ] as PricingRuleType[]);
    checkout = new Checkout(pricingRules);
  });

  describe("scan", () => {
    it("should add a product to the cart", () => {
      const product = new Product(SKU.ATV, "Apple TV", 109.5);
      checkout.scan(product);
      const cartItem = checkout["cart"].get(SKU.ATV);
      expect(cartItem?.product).toBe(product);
      expect(cartItem?.count).toBe(1);
    });

    it("should increment the count of a product already in the cart", () => {
      const product = new Product(SKU.IPD, "iPad", 549.99);
      checkout.scan(product);
      checkout.scan(product);
      const cartItem = checkout["cart"].get(SKU.IPD);
      expect(cartItem?.product).toBe(product);
      expect(cartItem?.count).toBe(2);
    });
  });

  describe("remove", () => {
    it("should remove one unit of a product from the cart", () => {
      const product = new Product(SKU.MBP, "MacBook Pro", 1399.99);
      checkout.scan(product);
      checkout.scan(product);
      checkout.remove(product);
      const cartItem = checkout["cart"].get(SKU.MBP);
      expect(cartItem?.product).toBe(product);
      expect(cartItem?.count).toBe(1);
    });

    it("should remove the product from the cart if the count goes to zero", () => {
      const product = new Product(SKU.VGA, "VGA adapter", 30.0);
      checkout.scan(product);
      checkout.remove(product);
      const cartItem = checkout["cart"].get(SKU.VGA);
      expect(cartItem).toBeUndefined();
    });

    it("should do nothing if the product is not in the cart", () => {
      const product = new Product(SKU.IPD, "iPad", 549.99);
      checkout.remove(product);
      const cartItem = checkout["cart"].get(SKU.IPD);
      expect(cartItem).toBeUndefined();
    });
  });

  describe("removeAll", () => {
    it("should remove all units of a product from the cart", () => {
      const product = new Product(SKU.IPD, "iPad", 549.99);
      checkout.scan(product);
      checkout.scan(product);
      checkout.removeAll(product);
      const cartItem = checkout["cart"].get(SKU.IPD);
      expect(cartItem).toBeUndefined();
    });

    it("should do nothing if the product is not in the cart", () => {
      const product = new Product(SKU.MBP, "MacBook Pro", 1399.99);
      checkout.removeAll(product);
      const cartItem = checkout["cart"].get(SKU.MBP);
      expect(cartItem).toBeUndefined();
    });
  });

  describe("emptyCart()", () => {
    it("should clear all items from the cart", () => {
      const pricingRules = new PricingRules([]);
      const checkout = new Checkout(pricingRules);

      checkout.scan(new Product(SKU.ATV, "Apple TV", 109.5));
      checkout.scan(new Product(SKU.IPD, "Super iPad", 549.99));
      checkout.scan(new Product(SKU.MBP, "MacBook Pro", 1399.99));
      checkout.removeAll(new Product(SKU.IPD, "Super iPad", 549.99));

      expect(checkout.total()).toBe(1509.49);

      checkout.emptyCart();

      expect(checkout.total()).toBe(0);
    });
  });

  describe("applyRule()", () => {
    it("should return 0 when cart is empty", () => {
      expect(checkout.total()).toBe(0);
    });

    it("should return correct total for one item in cart", () => {
      const product = new Product(SKU.IPD, "Super iPad", 549.99);
      checkout.scan(product);
      expect(checkout.total()).toBe(549.99);
    });

    it("should return correct total for multiple items in cart", () => {
      const product1 = new Product(SKU.IPD, "Super iPad", 549.99);
      const product2 = new Product(SKU.MBP, "MacBook Pro", 1399.99);
      const product3 = new Product(SKU.ATV, "Apple TV", 109.5);
      checkout.scan(product1);
      checkout.scan(product2);
      checkout.scan(product3);
      expect(checkout.total()).toBe(2059.48);
    });

    it("should return correct total when pricing rule is applied", () => {
      const product1 = new Product(SKU.IPD, "Super iPad", 549.99);
      checkout.scan(product1);
      checkout.scan(product1);
      checkout.scan(product1);
      checkout.scan(product1);
      expect(checkout.total()).toBe(1999.96);
    });
  });
});
