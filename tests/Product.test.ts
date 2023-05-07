import { SKU } from "../src/constants";
import Product from "Product/Product";

describe("Product", () => {
  const sku: SKU = SKU.ATV;
  const name = "Example Product";
  const price = 9.99;

  it("should create a new instance of Product with given parameters", () => {
    const product = new Product(sku, name, price);
    expect(product.sku).toBe(sku);
    expect(product.name).toBe(name);
    expect(product.price).toBe(price);
  });

  it("should throw an error if price is less than or equal to zero", () => {
    expect(() => new Product(sku, name, 0)).toThrow(
      "Price must be greater than zero"
    );
    expect(() => new Product(sku, name, -1)).toThrow(
      "Price must be greater than zero"
    );
  });
});
