import { BsPlusSquareFill  , BsDashSquareFill  } from "react-icons/bs";

export function CartItem( {thumbnail, id, title, price, quantity, add, remove} ){
  
  return (
    <div className="rounded bg-white h-[130px] w-[100%] flex flex-row p-3 py-4 pr-0 gap-3 justify-evenly">
      <div className="w-[100px]">
        <img
          className="max-w-[100px] max-h-[100px] self-center"
          alt={title}
          src={thumbnail}
        />
      </div>
      

      <div className="grid text-black w-[40%] font-semibold">
        <div className="self-end">
        <h1>{title}</h1>
        </div>
        
        <h2 className="self-end">$ {price}</h2>
      </div>

      <div className="flex flex-col text-black justify-center items-center text-center w-[40px] gap-3">
        <BsPlusSquareFill size={25} className="text-green-500 hover:cursor-pointer" onClick={() => add(id)} />
        <h2>{quantity}</h2>
        <BsDashSquareFill size={25} className="text-gray-700 hover:cursor-pointer" onClick={() => remove(id)}/>
      </div>
    </div>
  );
}