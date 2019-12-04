/**
 * @name ProductModel
 * @author Aélion - Déc. 2019 - cyrilabadie@yahoo.com
 * @version 1.0.0
 * @package models
 */
export abstract class ProductModel {
    /**
     * @var string
     * 
     * Name of the product (i.e : Lait, Farine, Oeuf, etc...)
     */
    protected name: string;

    /**
     * @var string
     * 
     * Base unit for the quantities of a product (i.e : l, kg, unity, etc...)
     */
    protected baseUnit: string

    public setName(name: string): void{
        if (this.name == null){
        this.name = name;
        }
    }
    public getName():string{
        return this.name.toUpperCase();
    }
    public setBaseUnit(baseUnit: string) : void {
        this.baseUnit = baseUnit;
    }
    public getBaseUnit(): string {
        return this.baseUnit;
    }
    

    /**
     * @var number
     * 
     * Price for the product name
     */
    protected price: number;

    public setPrice(price : number): void{
        if (this.price == null){
            this.price = price;
        }
    }
    public getPrice(): number{
        return this.price;
    }

    /**
     * @var number
     * 
     * Quantity of the product desired
     */
    protected quantityUnit: number;

    public setQuantityUnit(quantityUnit : number): void{
        if (this.quantityUnit == null){
            this.quantityUnit = quantityUnit;
        }
    }
    public getQuantityUnit(): number{
        return this.quantityUnit;
    }
    
 
    /**
     * @var number
     * Sets the strategy to use to display product line
     */
    protected strategy : number
/**
 * 
 * @param strategy number
 * 
 * Sets the strategy to use to display product line
 * Only 1, 2 or 3, fallback to 1
 */
    public setStrategy(strategy : number) : void {
        if (strategy >0 && strategy <=3) {
       this.strategy = strategy;
        } else {
            this.strategy = 1;  // Fallback
        }
    }
    
    public toString(): string{
        switch ( this.strategy) {
            case 1: // Name only

     return this.getName() ;
     

            case 2 : //Name and price 

        return this.getName() + ' ' + this.getPrice() + '€' ;
        
        
            case 3 : //Name and price and baseUnit
        return this.getName() + ' ' + this.getPrice() + '€ par '+ this.getBaseUnit() };
    }
}