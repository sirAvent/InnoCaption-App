import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import Product from './Product';

export default function StoreView({
  category,
  products,
  isProductLoaded,
  cart,
  setCart,
  page,
  inputPage,
  maxPage,
  searchQuery,
  handleToast,
  handlePreviousPage,
  handleNextPage,
  handlePageSubmit,
  handleInputPageChange
}){
  return (
    <div className='p-5 md:p-0'>
      <div className='flex flex-col md:flex-row justify-between lg:pr-32 md:mb-5 md:gap-y-auto xl:mr-5 gap-y-3 gap-x-20 items-center'>
        <span className="mb-5 sm:mb-0">
          {category !== '' && <>Shopping for {category.replace(/-/g, ' ')}</>}
          {searchQuery !== '' && <>Displaying results for "{searchQuery}"</>}
        </span>

        <div className={`
          flex flex-row gap-x-3 items-center md:mb-0 mb-5
         ${maxPage === 0 && 'opacity-0'}
        `}>
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

        
        
      </div>
      <div className='
        flex flex-row gap-y-20 gap-x-10 flex-wrap justify-center
        md:justify-even lg:pr-32 max-w-fit w-fit
      '>
        {isProductLoaded && products.map((product, index) => (
          <Product
            key = {index}
            id = {product.id}
            title={product.title}
            price={product.price}
            rating={product.rating}
            images={product.images}
            cart={cart}
            setCart={setCart}
            handleToast={handleToast}
          />
        ))}
      </div>
    </div>
  );
}