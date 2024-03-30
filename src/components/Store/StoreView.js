import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import Product from './Product';

export default function StoreView({
  category,
  products,
  isProductLoaded,
  page,
  inputPage,
  maxPage,
  handlePreviousPage,
  handleNextPage,
  handlePageSubmit,
  handleInputPageChange
}){
  return (
    <div className='p-5 sm:p-0'>
      <div className='flex flex-col sm:flex-row justify-between lg:pr-32 sm:mb-5 sm:gap-y-auto gap-y-3 gap-x-20 items-center'>
        <span>
          {category !== '' && <>Results for {category}</>}
        </span>

        { // Removed pagination when searched by category because the category search API does not support parameters: skip, limit 
          (category === '')
          &&
          <div className='flex flex-row gap-x-3 items-center sm:mb-0 mb-5'>
          <BsCaretLeftFill className='hover:cursor-pointer' onClick={handlePreviousPage} />
          <form onSubmit={handlePageSubmit}>
            <input
              className='
              h-[35px] w-[35px] outline-0 border-solid border-2 border-gray-900 rounded font-lg text-center black placeholder:text-black focus:placeholder:text-white
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              '
              placeholder={page}
              value={inputPage}
              type='number'
              onChange={handleInputPageChange}
            />
          </form>
          
            <span>...</span>
            <span className=''>{maxPage}</span>
          < BsCaretRightFill className='hover:cursor-pointer'  onClick={handleNextPage} />
        </div>
        }
        
        
      </div>
      <div className='flex flex-row gap-y-20 sm:gap-10 flex-wrap justify-center sm:justify-even lg:pr-32'>
        {isProductLoaded && products.map((product, index) => (
          <Product
            key = {index}
            id = {product.id}
            title={product.title}
            price={product.price}
            rating={product.rating}
            images={product.images}
          />
        ))}
      </div>
    </div>
  );
}