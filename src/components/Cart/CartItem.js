import { BsPlusSquareFill  , BsDashSquareFill  } from "react-icons/bs";

export function CartItem( {thumbnail, title, price, quantity} ){
  
  const decrement = () => {
    console.log('Dec')
  }

  const increment = () => {
    console.log('Inc')
  }

  return (
    <div className="rounded bg-white h-30 w-[100%] flex flex-row p-3 py-4 pr-0 gap-3 justify-evenly">
      <img
      className="max-w-[100px] max-h-[100px] self-center"
      alt={title}
      src={thumbnail}
      />

      <div className="grid text-black w-[40%] font-semibold">
        <div className="self-center">
        <h1>{title}</h1>
        </div>
        
        <h2 className="self-end">$ {price}</h2>
      </div>

      <div className="flex flex-col text-black justify-center items-center text-center w-[40px] gap-3">
        <BsPlusSquareFill size={25} className="text-green-500 hover:cursor-pointer" onClick={increment} />
        <h2>{quantity}</h2>
        <BsDashSquareFill size={25} className="text-gray-700 hover:cursor-pointer" onClick={decrement}/>
      </div>
    </div>
  );
}