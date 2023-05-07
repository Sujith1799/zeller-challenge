import { SKU } from "../constants";
import Product from "./Product";

// Create product instances
const superIpad = new Product(SKU.IPD, "Super iPad", 549.99);
const macbookPro = new Product(SKU.MBP, "MacBook Pro", 1399.99);
const appleTv = new Product(SKU.ATV, "Apple TV", 109.5);
const vgaAdapter = new Product(SKU.VGA, "VGA adapter", 30.0);

export { superIpad, macbookPro, appleTv, vgaAdapter };
