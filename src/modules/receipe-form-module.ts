import * as $ from 'jquery';
export class ReceipeFormModule{
    public constructor() {
        this.setCreateButtonHandler();
    }

    private setCreateButtonHandler(): void{
        $('#create-receipe').on(
            'click',
            (event:any): void => this.toggleIngredientForm(event)
        );
    }
    private toggleIngredientForm(event: any): void {
        if ($('#ingredient-form').hasClass('hidden-form')) {
            //Have to remove the hidden-form
            $('#ingredient-form').removeClass('hidden-form').addClass('animated heartBeat');
            
        } 
    }
}

/**
 * @name receipe form module
 * @author Aélion - Déc 2019 - cyrilabadie@yahoo.com
 * @package
 * @version 1.0.0
 */