import Checkout from "Checkout/Checkout";
import pricingRules from "PricingRules/rules";
import { appleTv, superIpad, vgaAdapter } from "Product/productList";

// Mock the Checkout class
jest.mock("Checkout/Checkout", () => {
  return jest.fn().mockImplementation(() => {
    return {
      scan: jest.fn(),
      total: jest.fn(),
      emptyCart: jest.fn(),
    };
  });
});

describe("Checkout", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    jest.clearAllMocks();
  });

  it("should call scan and emptyCart method of checkout class", () => {
    const co = new Checkout(pricingRules);

    co.scan(appleTv);
    co.scan(superIpad);
    co.scan(superIpad);
    co.scan(appleTv);

    expect(co.scan).toHaveBeenCalledTimes(4);
    expect(co.scan).toHaveBeenNthCalledWith(1, appleTv);
    expect(co.scan).toHaveBeenNthCalledWith(2, superIpad);
    expect(co.scan).toHaveBeenNthCalledWith(3, superIpad);
    expect(co.scan).toHaveBeenNthCalledWith(4, appleTv);

    co.total();
    expect(co.total).toHaveBeenCalled();

    co.emptyCart();
    expect(co.emptyCart).toHaveBeenCalled();
  });
});
