import * as $ from 'jquery';

export class ReceipeFormModule {
    public constructor() {
        this.setCreateButtonHandler();
        this.setFormKeyupHandler();
    }

    private setCreateButtonHandler(): void {
        $('#create-receipe').on(
            'click',
            (event: any): void => this.toggleIngredientForm(event)
        );
    }

    public static resetForm(): void {
        $('#create-receipe').attr('disabled', 'disabled');
        $('#receipe-title').val('');
        $('#receipe-title').removeAttr('disabled');
        $('#receipe-quantity').val('');
        $('#receipe-quantity').removeAttr('disabled');
    }

    private setFormKeyupHandler(): void {
        $('#receipe-form').on(
            'keyup change',
            (event: any): void => this.checkFormFill(event)
        );
    }
    
    private checkFormFill(event: any): void {
        if (
            $('#receipe-title').val().toString().trim() != '' &&
            $('#receipe-quantity').val().toString().trim() != ''
        ) {
            $('#create-receipe').removeAttr('disabled');
        } else {
            $('#create-receipe').attr('disabled', 'disabled');
        }
    }

    private toggleIngredientForm(event: any): void {
        if ($('#ingredient-form').hasClass('hidden-form')) {
            // Sets the span for the user
            $('#ingredient-form fieldset legend span').html($('#receipe-title').val().toString());
            // Have to remove the hidden-form class
            $('#ingredient-form').removeClass('hidden-form');
            $('#ingredient-form')
                .addClass('animated')
                .addClass('fadeInUp');
            // "Disable" the form components : fields and button
            $('#create-receipe').attr('disabled', 'disabled');
            $('#receipe-title').attr('disabled', 'disabled');
            $('#receipe-quantity').attr('disabled', 'disabled');
        }
    }


}