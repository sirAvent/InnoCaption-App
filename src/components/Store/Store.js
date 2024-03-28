import React, { useState, useEffect } from 'react';

export default function Store() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  
  };

  const handleCategorySubmit = (event) => {
    event.preventDefault();
    console.log("Category Search submitted:", category);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:p-5 lg:px-32 sm:px-16 gap-x-32">
      <form onSubmit={handleCategorySubmit} className='pt-5 pl-5 sm:p-5 sm:pt-2 border-solid sm:border-2 border-gray-200 rounded-md'>
        <h1 className='text-blue-900 font-semibold'>Search by Category</h1>
        <span className='flex flex-row sm:flex-col overflow-scroll sm:overflow-x-auto max-h-[350px] sm:text-sm'>
          {categories.map((category, index) => (
            <div key={index} className="mb-1 flex flex-row gap-x-1 sm:pr-10 inline-flex" style={{minInlineSize:"max-content"}}>
              <input
                className='hover:cursor-pointer '
                type="radio"
                id={`category-${index}`}
                name="categories"
                value={category}
                onChange={handleCategoryChange}
              />
              <label
                className='hover:cursor-pointer mr-5 mb-5 mt-3 sm:mr-0 sm:my-0'
                htmlFor={`category-${index}`}
              >
                {category}
              </label>
            </div>
          ))}
        </span>
       
        <div className='flex flex-row mt-2 sm:mt-5'>
          <input
            className='
            hover:cursor-pointer 
            p-1 px-2
            border-gray-700 rounded text-gray-700 
            font-semibold border-r-0 rounded-tr-none rounded-br-none
            bg-gray-300
            '
            type="button"
            value="Reset"
          />
          <input
            className='
            hover:cursor-pointer 
            p-1 px-2
            border-blue-900 rounded
            font-semibold border-l-0 rounded-tl-none rounded-bl-none
            bg-blue-800 text-white
            '
            type="submit"
            value="Submit"
          />

          
        </div>
      </form>

      <div className='p-5 sm:p-0'>Store Results</div>
    </div>
  );
}
