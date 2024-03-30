import { useEffect } from "react";
import { BsCart, BsXLg } from "react-icons/bs";
import { CartMenu } from "./CartMenu";

export function Cart({ cart, setCart, cartStatus, setCartStatus}){
  useEffect(() => {
    console.log("Cart Status:", cartStatus);
    if (cartStatus) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  }, [cartStatus]);
  
  const handleCartClick = () => {
    setCartStatus(!cartStatus)
  };

  const itemsInCart = cart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity;
  }, 0);
  
  return (
    <>
      <button onClick={handleCartClick}>
      {
        !cartStatus
        ?
          <div className="flex">
            <BsCart size={25} />
            <span
              className="
              text-xs absolute bg-red-500 min-w-[15px] px-[1px] rounded
              transform translate-x-[22px] translate-y-[22px]
              "
            >
                {itemsInCart}
              </span>
          </div>
          
        :
          <BsXLg size={25} />
      }
      </button>

      <CartMenu
        cart={cart}
        cartStatus={cartStatus}
        setCartStatus={setCartStatus}
      />
    </>
  )
}