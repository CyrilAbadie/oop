import { ProductModel } from "./models/product-model-correction";

/**
 * @name Main
 * @author Aélion - Déc. 2019 - jla.webprojet@gmail.com
 * @package /
 * @version 1.0.0
 * Entry point of the application
 */

 const strategy: number = 3;

 let produit1: ProductModel = new ProductModel();
 produit1.setStrategy(strategy);
produit1.setName('Farine');
produit1.setBaseUnit('kg');
produit1.setPrice(1.80);

let produit2: ProductModel = new ProductModel();
produit2.setStrategy(strategy);
produit2.setName('Lait');
produit2.setBaseUnit('l');
produit2.setPrice(0.94);

console.log('Pour faire des crèpes, j\'ai besoin de : \n');
console.log(produit1.toString());
console.log(produit2.toString());