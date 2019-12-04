/**
 * @name ProductModel
 * @author Aélion - Déc. 2019 - jla.webprojet@gmail.com
 * @version 1.0.0
 * @package models
 */
export class ProductModel {
    /**
     * @var string
     * 
     * Name of the product (i.e : Lait, Farine, Oeuf, ...)
     */
    private name: string;

    /**
     * @var string
     * 
     * Base unit for the quantities of a product (i.e : l, kg, unity, ...)
     */
    private baseUnit: string;

    /**
     * @var number
     * 
     * Price of a product
     */
    private price: number;

    /**
     * @var number
     * 
     * Sets the strategy to use to display product line
     */
    private strategy: number;

    /**
     * 
     * @param strategy number
     * 
     * Sets the strategy to display product line
     * Only 1, 2 or 3, fallback to 1
     */
    public setStrategy(strategy: number): void {
        if (strategy > 0 && strategy <= 3) {
            this.strategy = strategy;
        } else {
            this.strategy = 1; // Fallback
        }
    }

    public setName(name: string): void {
        if (this.name == null) {
            this.name = name;
        }
    }

    public getName(): string {
        return this.name.toUpperCase();
    }

    public setBaseUnit(baseUnit: string): void {
        this.baseUnit = baseUnit;
    }

    public getBaseUnit(): string {
        return this.baseUnit;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getPrice(): number {
        return this.price;
    }

    public toString(): string {
        switch (this.strategy) {
            case 1: // Name only
                return this.name;
            break;

            case 2: // Name and price
                return this.name + ' (' + this.price + '€)';
            break;

            case 3: // Name, price and unit
                return this.name + ' (' + this.price + '€) par ' + this.baseUnit; 
            break;
        }
    }
}
