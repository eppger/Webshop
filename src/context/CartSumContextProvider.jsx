import { useState } from "react"
import { CartSumContext } from "./CartSumContext"

export const CartSumContextProvider = ({children}) => {
    const [cartSum, setCartSum] = useState(calculateCartSum());

    function calculateCartSum(){
        const cartLS = JSON.parse(localStorage.getItem("cart") || "[]");
        let sum = 0;
        cartLS.forEach(product => sum += product.price * product.quantity);
        return sum;
    }

   function increase(amount) {
    setCartSum(cartSum + amount);
   }
   function decrease(amount) {
    setCartSum(cartSum - amount);
   }
   function zero() {
    setCartSum(0);
   }
    
    return (
        <CartSumContext.Provider value={{cartSum, increase, decrease, zero}}>
            {children}
        </CartSumContext.Provider>
    )
}