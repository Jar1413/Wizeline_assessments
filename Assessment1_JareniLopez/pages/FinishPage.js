import { Selector } from 'testcafe'

class FinishPage {
    constructor() {
        this.completeOrderConfirmation = Selector('#checkout_complete_container >h2')
    }
}

export default new FinishPage()