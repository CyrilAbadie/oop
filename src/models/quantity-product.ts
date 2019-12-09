import { ProductModel } from "./product-model";
import { ConvertHelper } from "./../helpers/convert-helpers";

/**
 * @name QuantityProduct
 * @author Aélio - Déc 2019 - cyrilabadie@yahoo.com
 * @package models
 * @version 1.0.0
 * 
 * Specify quantities and unit of a product for a receipe
 */
export class QuantityProduct extends ProductModel { // extends marque l'héritage de la classe qu'on vient de créé: ici elle hérite de ProductModel; 
//ca va spécifier la classe ProductModel (lui rajouter des infos)
//tout ce qui est public ou protégé est visible
    /**
     * @var number
     * Required quantity of the product for the receipe
     */
    private quantity: number;

    /**
     * @var string
     * 
     * Unit for the quantity
     */
    private unit: string;

    /**
     * 
     * @var number
     * 
     * Pricing of the product for a receipe
     * 
     */
    private unitPrice : number = 0

    public setQuantity(quantity: number) : void {//on a besoin de setter pour prendre de l'exterieur et ranger à l'intérieur de la classe : set = je définis ; get = je récupère
        this.quantity = quantity;
    }
    
    public getQuantity(): number{
        return this.quantity
    }
    
    public setUnit(unit: string): void {
        this.unit = unit;
    }
    public getUnit(): string{
        return this.unit;
    }

    public setUnitPrice(): void {
        const convertedQuantity: number = ConvertHelper.weight(this.baseUnit,this.unit,this.quantity);
        
        if (this.quantityUnit != null) {
            this.unitPrice = (convertedQuantity * this.price)/ this.quantityUnit;
        } else {
            this.unitPrice = (this.price * convertedQuantity);
        }     
    }
    public getUnitPrice(): number {
        return this.unitPrice
    }
    
}