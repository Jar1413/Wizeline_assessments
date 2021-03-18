import { Selector } from 'testcafe'

class MenuPage{
    constructor() {
        this.logoutButton = Selector('#logout_sidebar_link')
    }
}
export default new MenuPage()