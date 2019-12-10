import * as $ from 'jquery';
import { ReceipeFormModule } from './receipe-form-module';
import { QuantityProduct } from './../models/quantity-product';

export class IngredientFormModule {

    private form: JQuery = $('#ingredient-form');

    private fields: Array<JQuery> = new Array();

    private addAndContinue: JQuery = $('#add-and-next');
    private addAndStop: JQuery = $('#add-and-close');

    private checkAll: JQuery =$('#select-all');
    private receipe : ReceipeFormModule;

    //Dependancy injection ; Ungredients depends on Receipe



    
    public constructor(receipe : ReceipeFormModule) {
        this.form = $('#ingredient-form');
        this.receipe = receipe; //Retrieve DI

    


        this.getFormFields();

        // Sets the event handlers
        this.setEventHandlers();

    }



    
    private setEventHandlers() {
        this.form.on(
            'keyup change',
            (event: any): void => this.checkFormFill(event)         
        );

        this.addAndContinue.on(
            'click',
            (event: any): void => this.addIngredient(event)
        );

        this.addAndStop.on(
            'click',
            (event: any): void => this.addIngredientAndStop(event)
        );

        this.checkAll.on(
            'click',
            (event: any): void => this.checkAllCheckbox(event)
        );

        $('tbody').on(
            'click',
            '.ingredient-selection',
            (event:any) => this.manageSelectAllCheckboxes(event)
        )
    }
    private manageSelectAllCheckboxes(event: any): any {
       if (
           $('tbody .ingredient-selection:checked').length == $('tbody tr').length){
               this.checkAll.prop('checked' , true)
           }
           else {
               this.checkAll.prop('checked', false)
           }
           
    }


    private addIngredientAndStop(event: any): void {
        this.addRow();
        // Reset form...
        this.resetForm();

        // Hey Dude, did you think at the span of the legend ?
        // Sure not Hobiwan...
        this.form.children('fieldset').children('legend').children('span').html('');

       //Call the ModalModule to open up the modal
       $('.outer-modal .content strong').html(this.receipe.getRecette().getTitle());
       $('.outer-modal').removeClass('hidden');

        this.form
            .removeClass('fadeInUp')
            .removeClass('animated')
            .addClass('animated')
            .addClass('fadeOutDown');
        setTimeout(() => {
            this.form.removeClass('animated').removeClass('fadeOutDown');
            this.form.addClass('hidden-form');
        }, 1500);

        // Then reset the previous form... but... don't forget you got a receipe-form-module...
        // So use it
        ReceipeFormModule.resetForm();
    }
    
    private addIngredient(event: any): void {
        //Add a row in the table
        this.addRow();
        // Reset form too...
        this.resetForm();
    }

    private resetForm() {
        for (const field of this.fields) {
            if (field.is('input')) {
                // Hey guy... if unit-quantity, reset to one !!!
                if (field.attr('id') == 'unit-quantity') {
                    field.val('1');
                } else {
                    field.val('');
                }
                
            } else {
                // Hey... how do i move the selected option to the first one ?
                field.children('option').removeAttr('selected');
                field.children('option:first').attr('selected', 'selected');
            }
        }
        // Don't forget to disable buttons... but it's so easy
        $('[addIngredientButton]').attr('disabled', 'disabled');
    }
    private checkFormFill(event: any): void {
        let fieldValue: string;
        let numberOfError: number = 0;

        for (let field of this.fields) {
            if (field.is('input')) {
                fieldValue = field.val().toString().trim();
            } else {
                fieldValue = field.children('option:selected').val().toString();
            }

            if (fieldValue == '') {
                numberOfError = numberOfError + 1;
            }
        }
        // At the end...
        if (numberOfError === 0) {
            // Yeah guys... let's play
            $('[addIngredientButton]').removeAttr('disabled');
        } else {
            $('[addIngredientButton]').attr('disabled', 'disabled');
        }
    }

    private addRow(): void {
        const ingredient: QuantityProduct = this.createObject();

        const tableRow: JQuery = $('<tr>'); // Add an HTML Element in DOM

        const checkboxCell: JQuery = $('<td>');
        // Create a checkbox and add to the cell
        const checkbox: JQuery = $('<input>');
        checkbox.attr('type','checkbox');
        checkbox.addClass('ingredient-selection');
        let tableLength: number = $('aside#receipe-results table tbody tr').length + 1;
        console.log(`Next checkbox id: ${tableLength}`);
        checkbox.attr('id', 'ingredient-' + tableLength);
        checkboxCell.append(checkbox);    
        
        

        const ingredientTitleCell: JQuery = $('<td>');
        ingredientTitleCell.html(ingredient.getName());

        const ingredientQuantityCell: JQuery = $('<td>');
        if(ingredient.getUnit() == 'unité') {
            ingredientQuantityCell.html(ingredient.getQuantity().toString());}
            else {
                ingredientQuantityCell.html(ingredient.getQuantity() + ' ' + ingredient.getUnit());
             }
        
        const unitPriceCell: JQuery =$('<td>');
        unitPriceCell.html(ingredient.getUnitPrice().toString());
        


        //Add cells to row
        tableRow
            .append(checkboxCell)
            .append(ingredientTitleCell)
            .append(ingredientQuantityCell)
            .append(unitPriceCell);

        //Add row to tbody
        $('aside#receipe-results table tbody').append(tableRow);

        //Update totals...
        $('#receipe-total').html(this.receipe.getRecette().getReceipePrice().toString());
        $('#one-piece-total').html(this.receipe.getRecette().getUnitPrice().toString());
    }

    private createObject(): QuantityProduct {
        const ingredient: QuantityProduct = new QuantityProduct();

        ingredient.setName($('#ingredient-title').val().toString());
        ingredient.setBaseUnit($('#base-unit').children('option:selected').val().toString());
        ingredient.setPrice(parseFloat($('#ingredient-price').val().toString()));
        ingredient.setQuantity(parseInt($('#ingredient-quantity').val().toString()));
        ingredient.setUnit($('#target-unit').children('option:selected').val().toString());
        ingredient.setQuantityUnit(parseInt($('#unit-quantity').val().toString()));

        //Add ingredient to the receipe

        this.receipe.getRecette().addProduct(ingredient);
        console.log('Receipe updated : ' + JSON.stringify(this.receipe.getRecette()));

        

        //Compute the unit price...
        ingredient.setUnitPrice();


        return ingredient;

    }

    private checkAllCheckbox(event: any): void {
        console.log('Check or uncheck');
        if ($('tbody tr').length == 0) {
            this.checkAll.prop('checked', false);

        }   else {    
        if(this.checkAll.is(":checked")){
        
        $('tbody .ingredient-selection').prop('checked', true);
     } else {         
         $('tbody .ingredient-selection').prop('checked', false);
     }
    }
    }

    private getFormFields(): void {
        const fieldTypes: any = {
            field: 'input',
            list: 'select'
        };

        for (const key in fieldTypes) {
            this.form.find(fieldTypes[key]).each((index: number, element: HTMLElement) => {
                this.fields.push($(element));
            });
        }
    }
}