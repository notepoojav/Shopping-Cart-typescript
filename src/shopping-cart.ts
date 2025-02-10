interface CartProduct{
    title: string;
    quantity: number;
    price: number;
}

//const base_url = 'http://localhost:3001';
const view_products = 'http://localhost:3001/products';

export default class ShoppingCart{

    cartProducts : CartProduct[] = [];
   

    //fetchAPI
    async getProductPrice(title: string): Promise<number> {

       try{

        const response = await fetch(`${view_products}/${title}`);
        console.log(`product title: ${title}`);
        console.log(`response status: ${(await response).status}`);

        if(response.status != 200){
            console.log(`Request failed with status: ${response.status}`);
            throw new Error(`Request failed with status: ${response.status}`);
        }

        //response is ok
        const responseData = await response.json();
        return responseData.price;
    }catch{
        throw new Error(`Request to fetch price for ${title} failed. Try again!`);
    }
}

   //addProducttoCart

    async addProductToCart(title: string, quantity: number): Promise<void>{

        const price = await this.getProductPrice(title);
        const itemExistsInCart = this.cartProducts.find( product => product.title === title);

        if(itemExistsInCart){
            // console.log(`Item count increases`);
            itemExistsInCart.quantity += quantity;
        }
        else{
            this.cartProducts.push({title, quantity, price});

        }
        
    }
   

    //getCartState - subtotal/tax/finalAmount

    getCartState() {
        
        const subTotal = this.cartProducts.reduce(
            (total, product) => total + product.quantity * product.price
            , 0);
        
        const taxRate : number = 0.125;
        const taxPayable = (subTotal * taxRate);
        const finalAmount = parseFloat((subTotal+taxPayable).toFixed(2));

        const totalNumberOfItemsToCheckout = this.cartProducts.reduce(
            (count,item) => (count + item.quantity),0
        )

        console.log(`CHECKOUT DETAILS:`);
        return{ productsToCheckout: this.cartProducts,
            totalNumberOfItemsToCheckout,
            subTotal,
             taxPayable,
              finalAmount};
    }
}

