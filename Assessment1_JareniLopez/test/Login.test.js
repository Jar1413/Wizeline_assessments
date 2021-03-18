import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'
import MenuPage from '../pages/MenuPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import OverviewPage from '../pages/OverviewPage'
import FinishPage from '../pages/FinishPage'
import { CREDENTIALS } from '../data/Constants'
import { t } from 'testcafe'


fixture `Login feature testing`
    .page `https://www.saucedemo.com/`
    
test('User is able to login with valid credentials', async t => {
    await t
        .typeText(LoginPage.userNameField, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.passwordField, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton)

    await t.expect(ProductsPage.pageTitle.exists).ok()
})

test('User is not able to login entering invalid user', async t => {
    await t
        .typeText(LoginPage.userNameField, CREDENTIALS.INVALID_USER.USERNAME)
        .typeText(LoginPage.passwordField, CREDENTIALS.INVALID_USER.PASSWORD)
        .click(LoginPage.loginButton)

    await t.expect(LoginPage.errorMessage.exists).ok()
})

test('User is able to log off the application', async t => {
    await t
        .typeText(LoginPage.userNameField, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.passwordField, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton)
        .click(ProductsPage.menuIcon)
        .click(MenuPage.logoutButton)
    
    await t.expect(LoginPage.userNameField.exists).ok()

})

test('User navigates to shopping cart page', async t => {
    await t
        .typeText(LoginPage.userNameField, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.passwordField, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton)
        .click(ProductsPage.cartIcon)
    
    await t.expect(CartPage.cartTitle.exists).ok()
})

test('User adds a single item to the shopping cart', async t => {
    let productWillAdded = [ProductsPage.productList.nth(2)];

    await t
        .typeText(LoginPage.userNameField, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.passwordField, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton);

    let productNamesAdded = [];
    for(const product of productWillAdded){
        await t.click(product.find('.pricebar > button'));
        productNamesAdded.push(await product.find('div > a > .inventory_item_name').textContent);
    }
 
    await t.click(ProductsPage.cartIcon)

    let cartProductList = CartPage.productsAdded
    const count = await cartProductList.count
    let cartPoductNames = []
    for( var idx = 0; idx < count; idx++){
        cartPoductNames.push(await cartProductList.nth(idx).textContent);
    }

    await t.expect(productNamesAdded.join()).contains(cartPoductNames.join())
    await t.expect(productNamesAdded.length).eql(count)
})

test('User adds multiple items to the shopping cart', async t => {
    let productWillAdded = [ProductsPage.productList.nth(0),
        ProductsPage.productList.nth(2),
        ProductsPage.productList.nth(4)
    ];

    await t
        .typeText(LoginPage.userNameField, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.passwordField, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton);

    let productNamesAdded = [];
    for(const product of productWillAdded){
        await t.click(product.find('.pricebar > button'));
        productNamesAdded.push(await product.find('div > a > .inventory_item_name').textContent);
    }
 
    await t.click(ProductsPage.cartIcon)

    let cartProductList = CartPage.productsAdded
    const count = await cartProductList.count
    let cartPoductNames = []
    for( var idx = 0; idx < count; idx++){
        cartPoductNames.push(await cartProductList.nth(idx).textContent);
    }

    await t.expect(productNamesAdded.join()).contains(cartPoductNames.join())
    await t.expect(productNamesAdded.length).eql(count)
    
})

test('User not entering information for the checkout', async t => {
    let productWillAdded = [ProductsPage.productList.nth(0),
        ProductsPage.productList.nth(2),
        ProductsPage.productList.nth(4)
    ];

    await t
        .typeText(LoginPage.userNameField, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.passwordField, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton);

    let productNamesAdded = [];
    for(const product of productWillAdded){
        await t.click(product.find('.pricebar > button'));
        productNamesAdded.push(await product.find('div > a > .inventory_item_name').textContent);
    }
 
    await t.click(ProductsPage.cartIcon)

    let cartProductList = CartPage.productsAdded
    const count = await cartProductList.count
    let cartPoductNames = []
    for( var idx = 0; idx < count; idx++){
        cartPoductNames.push(await cartProductList.nth(idx).textContent);
    }
        await t
        .click(CartPage.checkoutButton)
        .click(CheckoutPage.continueButton)
    
    await t.expect(CheckoutPage.errorMessage.exists).ok()
})

test('User enters valid information on checkout', async t => {
    let productWillAdded = [ProductsPage.productList.nth(0),
        ProductsPage.productList.nth(2),
        ProductsPage.productList.nth(4)
    ];

    await t
        .typeText(LoginPage.userNameField, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.passwordField, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton);

    let productNamesAdded = [];
    for(const product of productWillAdded){
        await t.click(product.find('.pricebar > button'));
        productNamesAdded.push(await product.find('div > a > .inventory_item_name').textContent);
    }
 
    await t.click(ProductsPage.cartIcon)

    let cartProductList = CartPage.productsAdded
    const count = await cartProductList.count
    let cartPoductNames = []
    for( var idx = 0; idx < count; idx++){
        cartPoductNames.push(await cartProductList.nth(idx).textContent);
    }

        await t
        .click(CartPage.checkoutButton)
        .typeText(CheckoutPage.firstNameField, 'Jareni')
        .typeText(CheckoutPage.lastNameField, 'Lopez')
        .typeText(CheckoutPage.zipCodeField, '3342')
        .click(CheckoutPage.continueButton)

    await t.expect(OverviewPage.overviewTitle.exists).ok()
})

test('User validates all items in Overview page match with added items', async t => {
    let productWillAdded = [ProductsPage.productList.nth(0),
        ProductsPage.productList.nth(2),
        ProductsPage.productList.nth(4)
    ];

    await t
        .typeText(LoginPage.userNameField, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.passwordField, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton);

    let productNamesAdded = [];
    for(const product of productWillAdded){
        await t.click(product.find('.pricebar > button'));
        productNamesAdded.push(await product.find('div > a > .inventory_item_name').textContent);
    }
 
    await t.click(ProductsPage.cartIcon)

    let cartProductList = CartPage.productsAdded
    const count = await cartProductList.count
    let cartPoductNames = []
    for( var idx = 0; idx < count; idx++){
        cartPoductNames.push(await cartProductList.nth(idx).textContent);
    }

        await t
        .click(CartPage.checkoutButton)
        .typeText(CheckoutPage.firstNameField, 'Jareni')
        .typeText(CheckoutPage.lastNameField, 'Lopez')
        .typeText(CheckoutPage.zipCodeField, '3342')
        .click(CheckoutPage.continueButton)
    
    let checkoutList = OverviewPage.productsCheckout
    const counter = await checkoutList.count
    let checkoutPoductNames = []
        for( var idx = 0; idx < counter; idx++){
            checkoutPoductNames.push(await checkoutList.nth(idx).textContent);
        }   
    
    await t.expect(cartPoductNames.join()).contains(checkoutPoductNames.join())
    await t.expect(cartPoductNames.length).eql(counter)
 
})

test('User is able to see the confirmation page', async t => {
    let productWillAdded = [ProductsPage.productList.nth(0),
        ProductsPage.productList.nth(2),
        ProductsPage.productList.nth(4)
    ];

    await t
        .typeText(LoginPage.userNameField, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.passwordField, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton);

    let productNamesAdded = [];
    for(const product of productWillAdded){
        await t.click(product.find('.pricebar > button'));
        productNamesAdded.push(await product.find('div > a > .inventory_item_name').textContent);
    }
 
    await t.click(ProductsPage.cartIcon)

    let cartProductList = CartPage.productsAdded
    const count = await cartProductList.count
    let cartPoductNames = []
    for( var idx = 0; idx < count; idx++){
        cartPoductNames.push(await cartProductList.nth(idx).textContent);
    }

        await t
        .click(CartPage.checkoutButton)
        .typeText(CheckoutPage.firstNameField, 'Jareni')
        .typeText(CheckoutPage.lastNameField, 'Lopez')
        .typeText(CheckoutPage.zipCodeField, '3342')
        .click(CheckoutPage.continueButton)
        .click(OverviewPage.finishButton)

    await t.expect(FinishPage.completeOrderConfirmation.exists).ok()
})

