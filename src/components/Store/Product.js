import { BsStar, BsStarFill, BsStarHalf, BsCartPlusFill  } from "react-icons/bs";

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

function Product({ id, title, rating, price, images }) {
  return (
    <div key={id} className="item max-w-[300px] max-h[500px] sm:w-[225px] sm:h-[380px] shrink border-b-2 border-blue-600 shadow-md overflow-hidden">
      <img
        className='relative max-w-[300px] sm:max-w-[210px] sm:h-[250px] object-scale-down bg-gray-100 transform transition duration-300 hover:cursor-pointer'
        src={images[0]}
      />
      <div className='relative flex flex-col bg-white z-10 p-2 font-semibold h-[130px] justify-between'>
        <div className='mb-1'>
          <h1>{title}</h1>
          <RatingStars rating={rating} />
        </div>
        <span className='flex flex-row items-center justify-between mt-3'>
          ${price}
          <BsCartPlusFill size={25} style={{transform:"translateX(-5px) translateY(-10px)"}} className="hover:cursor-pointer" />
        </span>
      </div>
      
    </div>
  )
}

export default Product;
