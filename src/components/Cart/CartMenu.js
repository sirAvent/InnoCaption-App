import { useState, useEffect } from "react";
import { CartItem } from "./CartItem"

export function CartMenu({ cart, setCart, cartStatus, setCartStatus }){
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const cost = cart.reduce((accumulator, currentItem) => {
      return accumulator + (currentItem.quantity * currentItem.price);
    }, 0);
    setTotalCost(cost);
  }, [cart]);

  const decrement = (id) => {
    const foundIndex = cart.findIndex(item => item.id === id)
    console.log(foundIndex);
    if (foundIndex !== -1) {
      // Create a copy of cart and set it to trigger component update
      const cartCopy = [...cart];
      if (cartCopy[foundIndex].quantity <= 1) {
        // Remove the product from cart if quantity is 1
        const updatedCart = cartCopy.filter(item => item.id !== id);
        console.log('updated', updatedCart)
        setCart(updatedCart);
      } else {
        cartCopy[foundIndex].quantity--;
        setCart(cartCopy)
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
      setCart(cartCopy)
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
        z-20 transform translate-x-[100%]
        duration-300 grid
        ${cartStatus && 'transform translate-x-0'}
        
      `}>
        

        <div className={`self-start inline-grid p-10 gap-5 w-[100%] ${cart.length >= 6 && 'overflow-y-scroll'}`}>
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