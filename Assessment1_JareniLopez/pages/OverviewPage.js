import { Selector } from 'testcafe'

class OverviewPage {
    constructor() {
        this.overviewTitle = Selector('#contents_wrapper > div.subheader')
        this.productsCheckout = Selector('div.cart_list > div.cart_item > div.cart_item_label > a > div.inventory_item_name')
        this.finishButton = Selector('div.cart_footer > a.btn_action.cart_button')
    }
}

export default new OverviewPage()