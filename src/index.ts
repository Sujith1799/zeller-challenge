import Checkout from "./Checkout/Checkout";
import pricingRules from "./PricingRules/rules";
import { appleTv, superIpad, vgaAdapter } from "./Product/productList";

// Create checkout instance
const co = new Checkout(pricingRules);

// Scan items
co.scan(appleTv);
co.scan(superIpad);
co.scan(superIpad);
co.scan(appleTv);
co.scan(superIpad);
co.scan(superIpad);
co.scan(superIpad);

// Calculate total price
console.log(`Total Price - Scenario 1: $${co.total()}`);

co.emptyCart();
co.scan(appleTv);
co.scan(appleTv);
co.scan(appleTv);
co.scan(vgaAdapter);

// Calculate total price
console.log(`Total Price - Scenario 2: $${co.total()}`);
