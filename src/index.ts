import ShoppingCart from "./shopping-cart";

async function main(){
    
    const shoppingCart = new ShoppingCart();

    await shoppingCart.addProductToCart('shreddies',1);
    await shoppingCart.addProductToCart('cornflakes',1);
    await shoppingCart.addProductToCart('weetabix',1);
    await shoppingCart.addProductToCart('shreddies',2);


    console.log(shoppingCart.getCartState());
  
}

main();