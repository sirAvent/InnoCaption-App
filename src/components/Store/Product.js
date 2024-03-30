import { BsStar, BsStarFill, BsStarHalf, BsCartPlusFill, BsCartCheckFill  } from "react-icons/bs";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating % 1;
  const hasHalfStar = decimalPart >= 0.3;
  const emptyStars = hasHalfStar ? 5 - Math.ceil(rating) : 5 - Math.round(rating);

  const starsArray = [...Array(fullStars)].map((_, index) => (
    <BsStarFill key={index} />
  ));
  if (hasHalfStar) {
    starsArray.push(<BsStarHalf key="half" />);
  }
  [...Array(emptyStars)].map((_, index) => (
    starsArray.push(<BsStar key={index + fullStars + (hasHalfStar ? 1 : 0)} />)
  ));

  return (
    <span className='flex flex-row text-yellow-400 items-center'>
      <span className="text-sm font-light text-gray-600 mr-1">{rating}</span>
      {starsArray}
    </span>
  );
};

function Product({ id, title, rating, price, images, cart, setCart}) {

  const addToCart = (id, title, price, thumbnail) => {
    const cartCopy = [...cart];
    cartCopy.push({
        discountedPercentage: 0,
        discountedPrice: price,
        id:id,
        price:price,
        quantity: 1,
        thumbnail: thumbnail,
        title:title,
        total:price
    })
    setCart(cartCopy)

  }

  const removeFromCart = (id) => {
  }

  const inCart = (id) => {
    const foundIndex = cart.findIndex(item => item.id === id)
    return (foundIndex !== -1)
  }
  return (
    <div key={id} className="flex flex-col item max-w-[300px] max-h[500px] md:w-[215px] md:h-[380px] shrink border-b-2 border-blue-600 shadow-md overflow-hidden">
      <img
        className='relative max-w-[300px] md:max-w-[215px] md:h-[250px] object-scale-down bg-gray-100 transform transition duration-300 hover:cursor-pointer'
        src={images[0]}
        alt={title}
      />
      <div className='relative flex flex-col bg-white z-10 p-2 font-semibold h-[130px] justify-between'>
        <div className='mb-1'>
          <h1>{title}</h1>
          <RatingStars rating={rating} />
        </div>
        <span className='flex flex-row items-center justify-between mt-3'>
          ${price}
          {
            inCart(id)
            ?
            <BsCartCheckFill 
              size={25}
              style={{transform:"translateX(-5px) translateY(-10px)"}}
              className="hover:cursor-pointer text-green-600"
            />
            :
            <BsCartPlusFill
              size={25}
              style={{transform:"translateX(-5px) translateY(-10px)"}}
              className="hover:cursor-pointer"
              onClick={() => addToCart(id, title, price, images[0])}
            />
          }
          
        </span>
      </div>
      
    </div>
  )
}

export default Product;
