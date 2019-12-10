import { QuantityProduct } from "./quantity-product";

export class Recette{
    private ingredients: Array<QuantityProduct> = new Array <QuantityProduct>();

    private title : string;
    private quantity : number = 1;

    public constructor (title : string) {
        this.title= title;
    }
    private price : number =0
    private unitPrice : number =0

    private receipePrice: number =0

    public getReceipePrice(): number{
        return this.receipePrice
    }
    public getUnitPrice(): number {
        return this.unitPrice
    }


    public addProduct(product : QuantityProduct): void{
        product.setUnitPrice();
        
        this.price = Math.round((this.price + product.getUnitPrice())*1000)/1000;
        
        this.ingredients.push(product);
    }
    


    public setQuantity(quantity :number): void{
        this.quantity = quantity;
    }
    public getQuantity(): number{
        return this.quantity
    }



    public toString(): string {
        let theRecette: string ='La recette des ' + this.title + '\n'; 
        //Loop over ingredients array
        this.ingredients.forEach((value: QuantityProduct) =>{
        theRecette += value.toString() + '\n';
            // +=:ASA theRecette = theRecette + value.toString()
        });
        const unitPrice = Math.round(this.price/this.quantity*1000)/1000 ;

        theRecette += 'Coût de production : ' + unitPrice + '\n' + 'et pour ' + this.quantity + ' crepes : ' + this.price;

        return theRecette
    }

}