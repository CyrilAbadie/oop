import * as $ from 'jquery';
import { ReceipeFormModule } from './modules/receipe-form-module';
import { IngredientFormModule } from './modules/ingredient-form-module';

/**
 * @name Main
 * @author Aélion - Déc. 2019 - cyrilabdie@yahoo.com
 * @package
 * @version 1.1.0
 */
export class Main {
    public constructor() {
        new ReceipeFormModule();
        new IngredientFormModule();
    }
}

//App bootstraping with jQuery
//Create a new instance of the Main class
// after the document was completely loaded
$(document).ready(() => {
    const app: Main = new Main();
});
