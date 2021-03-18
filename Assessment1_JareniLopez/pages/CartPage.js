import { Selector } from 'testcafe'

class CartPage{
    constructor(){
        this.cartTitle = Selector('.subheader')
        this.checkoutButton = Selector('a.btn_action.checkout_button')
        this.productsAdded = Selector('div.cart_list > div.cart_item > div.cart_item_label > a > div.inventory_item_name')
    }
}

export default new CartPage()