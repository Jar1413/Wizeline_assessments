import { Selector } from 'testcafe'

class CheckoutPage {
    constructor() {
        this.firstNameField = Selector('#first-name')
        this.lastNameField = Selector('#last-name')
        this.zipCodeField = Selector('#postal-code')
        this.continueButton = Selector('div.checkout_buttons > input')
        this.errorMessage = Selector('h3[data-test= "error"]')
        

    }

}
 
export default new CheckoutPage()