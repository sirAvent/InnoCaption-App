import { useState, useEffect } from "react";
import { CartItem } from "./CartItem"
import { updateCart } from "../../services/updateCart";

export function CartMenu({ cart, setCart, cartStatus, handleToast }){
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const cost = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.total;
    }, 0);
    setTotalCost(cost);
  }, [cart]);

  const decrement = (id) => {
    const foundIndex = cart.findIndex(item => item.id === id)
    console.log(foundIndex);
    if (foundIndex !== -1) {
      // Item is in cart
      // Create a copy of cart and set it to trigger component update
      const cartCopy = [...cart];
      if (cartCopy[foundIndex].quantity <= 1) {
        // Remove the product from cart if quantity is 1
        const updatedCart = cartCopy.filter(item => item.id !== id);
        updateCart({userid:1, cart:updatedCart}).then(
          response => {
            if (response) {
              setCart(updatedCart);
              handleToast(true, true);
            } else {
              // update cart to server wasn't successful
              handleToast(true, false);
            }
          }
        ); 
      } else {
        updateCart({userid:1, cart:cartCopy}).then(
          response => {
            if (response) {
              cartCopy[foundIndex].quantity--;
              cartCopy[foundIndex].total -= cartCopy[foundIndex].price;
              setCart(cartCopy);
              handleToast(true, true);
            } else {
              // update cart to server wasn't successful
              handleToast(true, false);
            }
          }
        );
        
      }
    }
    console.log(cart)
  }

  const increment = (id) => {
    const foundIndex = cart.findIndex(item => item.id === id)
    console.log(foundIndex);
    if (foundIndex !== -1) {
      // Create a copy of cart and set it to trigger component update
      const cartCopy = [...cart];
      cartCopy[foundIndex].quantity++;
      cartCopy[foundIndex].total += cartCopy[foundIndex].price;
      updateCart({userid:1, cart:cartCopy}).then(
        response => {
          if (response) {
            setCart(cartCopy)
            handleToast(true, true);
          } else {
            // update cart to server wasn't successful
            handleToast(true, false);

          }
          
        }
      )
      
    }
    console.log(cart)
  }

  return (
    <>
      <div 
        className={`
        ${cartStatus
          ? 
          'absolute top-0 left-0 h-[100svh] w-[100svw] bg-gray-800 opacity-[.5] mt-[68px] md:mt-[88px]'
          :
          'hidden'
        }
        
      `}
      />
      <div className={`
        fixed bg-blue-800 right-0 top-0 bottom-0
        md:mt-[88px] md:w-[45vw] md:max-w-[calc(500px+30px)]
        mt-[68px] w-[100vw]
        z-20 transform 
        duration-300 grid overflow-auto
        ${cartStatus ? 'transform translate-x-[0]' : 'translate-x-[100%]'}
        
      `}>
        

        <div className={`self-start inline-grid p-10 gap-5 w-[100%]`}>
          {cart.map((product, index) => (
            <CartItem
              key={index}
              id={product.id}
              thumbnail={product.thumbnail}
              title={product.title}
              price={product.price}
              quantity={product.quantity}
              add={increment}
              remove={decrement}
            />
          ))}
          {
            cart.length === 0
            ?
            <h3 className="text-xl font-bold self-end mb-10 text-center">No items in cart!</h3>
            :
            <div className="text-xl font-bold justify-self-end">
              Total: ${totalCost}
            </div>
          }
          
        </div>
       
      </div>
    </>
  )
}