import { CartItem } from "./CartItem"

export function CartMenu({ cart, cartStatus, setCartStatus }){

  const totalCost = cart.reduce((accumulator, currentItem) => {
    return accumulator + (currentItem.quantity * currentItem.price);
  }, 0);

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
        md:mt-[88px] md:w-[45vw] md:max-w-[500px]
        mt-[68px] w-[100vw]
        z-20 transform translate-x-[100%]
        duration-300 grid
        ${cartStatus && 'transform translate-x-0'}
        
      `}>
        {/* After 5 Items, show scroll */}
        <div className={`inline-grid p-10 gap-5 w-[100%] ${cart.length >= 6 && 'overflow-y-scroll'}`}>
          {cart.map((product, index) => (
            <CartItem
              key={index}
              thumbnail={product.thumbnail}
              title={product.title}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
          <div className="text-xl font-bold">
            Total: ${totalCost}
          </div>
        </div>
       
      </div>
    </>
  )
}