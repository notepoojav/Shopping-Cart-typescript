import ShoppingCart from "./shopping-cart";


async function testAddProductToCart(): Promise<any>{

    // TEST CASE 1 : Check if totalNumberofItems in cart is updated when new product is added
    const shoppingCart1 = new ShoppingCart();
    await shoppingCart1.addProductToCart("cornflakes",2);

    const cartState = await shoppingCart1.getCartState();
    //console.log(cartState);
    console.assert(cartState.totalNumberOfItemsToCheckout === 2 , `TEST CASE 1 FAILED. Total Num of items to Checkout should be 2!`);
    console.log(`TEST CASE 1: Final Cart Quantity : PASSED`)

    //TEST CASE 2: SUBTOTAL Amount for quantity of 2 products
    console.assert(cartState.subTotal === 9.98 , `TEST CASE 1 FAILED. Incorrect Subtotal amount!`);
    console.log(`TEST CASE 2 : Subtotal Calculation : PASSED`);

    //TEST CASE 3: If same product is added again, quantity must increase according to 2nd parameter
    await shoppingCart1.addProductToCart("cornflakes",1);
    const cartState2 = shoppingCart1.getCartState();

    console.assert(cartState2.totalNumberOfItemsToCheckout === 3, `TEST CASE 3 FAILED. totalNumberOfItemsToCheckout is INCORRECT `);
    console.log(`TEST CASE 3: Addition of same product, increases the count! : PASSED`);

}


async function testCartState(){

    //TEST CASE 4: EMPTY CART 

    const shoppingCart2 = new ShoppingCart();
    const cartState3 = shoppingCart2.getCartState();

    console.assert(cartState3.totalNumberOfItemsToCheckout === 0 , `TEST CASE 4 FAILED. EXPECTED 0`);
    console.log(`TEST CASE 4 : EMPTY cart return 0 items : PASSED`);

    //TEST CASE 5: ROUNDING FINAL AMOUNT

    await shoppingCart2.addProductToCart('shreddies',5);
    const cartState4 = shoppingCart2.getCartState();

    console.assert(cartState4.finalAmount === 36.51, `TEST CASE 5 FAILED.`);
    console.log(`TEST CASE 5 : Round Final Amount: PASSED`);


}


async function tests(){
  await testAddProductToCart();
  await testCartState();
  
}

tests();
