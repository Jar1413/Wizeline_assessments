import { Selector } from 'testcafe'

class ProductsPage {
    constructor() {
        this.pageTitle = Selector('#inventory_filter_container')
        this.menuIcon = Selector('#react-burger-menu-btn')
        this.cartIcon = Selector('#shopping_cart_container')
        this.productList = Selector('#inventory_container > .inventory_list > .inventory_item')
    }

}

export default new ProductsPage()