import { BsSearch, BsCart } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function Nav({ setSearchQuery, category, setCategory, handleCategoryChange }) {
  const [queryInput, setQueryInput] = useState("")
  const [cartStatus, setCartStatus] = useState(false); 

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(queryInput);
    setCategory('');
    handleCategoryChange({ target: { value: '' } });
    console.log("Search submitted:", queryInput);
  };

  const handleCartClick = () => {
    setCartStatus(!cartStatus)
  };

  useEffect(() => {
    console.log("Cart Status:", cartStatus);
  }, [cartStatus]);


  useEffect(()=> {
    if (category !== "") {
      setQueryInput("");
    }
  }, [category]);
  return (
    <>
      <nav
        className="
          flex flex-row justify-between gap-x-5 bg-blue-800 text-white p-5
          lg:px-32
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
  
        <button onClick={handleCartClick}>
          <BsCart 
            size={25}
          />
        </button>
      </nav>

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
    </>
  )
}
