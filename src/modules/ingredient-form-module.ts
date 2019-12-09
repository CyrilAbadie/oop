import * as $ from 'jquery';

export class IngredientFormModule {
    private form: JQuery = $('#ingredient-form');

    private fields: Array<JQuery> = new Array();

    private addAndContinue: JQuery = $('#Add-and-Continue');
    private addAndClose: JQuery = $('#Add-and-Close');

    public constructor() {
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
            (event: any): void => this.resetForm(event)
        );

            }
  

    private checkFormFill(event: any): void {
        let fieldValue: string
        let numberOfError: number = 0;

        for (let field of this.fields) {
            if (field.is('input')) {
                fieldValue = field.val().toString().trim();
            } else {
                fieldValue = field.children('option:selected').val().toString();
            }

            if (fieldValue == '') {
                console.warn(`On a un problème sur : ${field.attr('id')}`);
                numberOfError = numberOfError + 1;
            }
        }
        // At the end...
        if (numberOfError === 0) {
            //Yeah guys...let's play
            this.addAndContinue.removeAttr('disabled');
            this.addAndClose.removeAttr('disabled');
        }
        else {
            this.addAndContinue.attr('disabled', 'disabled');
            this.addAndClose.attr('disabled', 'disabled');

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

    private resetForm(event: any): void {
        this.form.removeClass('hidden-form').addClass('animated fadeInUp');

        for (let field of this.fields) {
            if (field.is('input')) {
                field.val('');
            } else {
                
            }

        }
        this.addAndContinue.attr('disabled', 'disabled');
        this.addAndClose.attr('disabled', 'disabled');

    }

    
}