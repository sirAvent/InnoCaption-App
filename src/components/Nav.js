import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Cart } from "./Cart/Cart";

export default function Nav({
  setSearchQuery,
  category,
  cart,
  setCart,
  setCategory,
  handleToast,
  handleCategoryChange,
  setPage,
  setInputPage
}) {
  const [queryInput, setQueryInput] = useState("")
  const [cartStatus, setCartStatus] = useState(false); 

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(queryInput);
    setCategory('');
    setPage(1);
    setInputPage(1);
    handleCategoryChange({ target: { value: '' } });
    console.log("Search submitted:", queryInput);
  };

  useEffect(()=> {
    if (category !== "") {
      setQueryInput("");
    }
  }, [category]);
  return (
    <nav className="fixed w-[100%] z-50">
      <div
        className="
          flex flex-row justify-between gap-x-5 bg-blue-800 text-white p-5 px-7
          lg:pl-32
          lg:pr-[calc(8rem+30px)]
          md:px-16
        "
      >
        <h1 className="self-center text-xl font-medium">InnoCaption</h1>

        <form
          className="text-black bg-white p-3 hidden md:flex w-[50%]"
          onSubmit={handleSearchSubmit}
        >
          <input
            className="outline-0 w-[100%]"
            type="text"
            placeholder="What can we help you find?"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
          />
          <button>
            <BsSearch size={20} color="darkgray"/>
          </button>
        </form>
  
        <Cart
          cart={cart}
          setCart={setCart}
          cartStatus={cartStatus}
          setCartStatus={setCartStatus}
          handleToast={handleToast}
        />
      </div>

      <form
        className="flex flex-row bg-gray-100 md:hidden px-4"
        onSubmit={handleSearchSubmit}
      >
        <button className="self-center px-3">
          <BsSearch size={20} color="darkgray"/>
        </button>
        <input
          className="py-4 bg-transparent w-[100%] outline-0"
          type="text"
          placeholder="What can we help you find?"
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
        />
      </form>
    </nav>
  )
}
