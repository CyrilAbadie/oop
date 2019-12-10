import * as $ from'jquery';
import { IngredientFormModule } from './ingredient-form-module';

export class ModalModule {
    
    private myModal: JQuery = $('.outer-modal'); 
    private form: IngredientFormModule;

    public constructor(form: IngredientFormModule) {
        this.form = form ;

        $('.outer-modal strong').html('Le titre de la recette');

        this.setEventHandlers();
    }
    
    public show(): void{
        this.myModal.removeClass('hidden');
        
    }

    public hide(): void{
        this.myModal.addClass('hidden');
        
    }

    private setEventHandlers() : void {
       $('div.footer button.btn-primary').on(
            'click',
            (event: any): void => this.yesButton(event)
       );
       $('div.footer button.btn-danger').on(
            'click',
            (event: any): void => this.noButton(event)
        );
    }

    private noButton(event: any): void {
        console.log('Click on No button');
    }

    private yesButton(event: any): void {
        console.log('Click on Yes button');
    }

}