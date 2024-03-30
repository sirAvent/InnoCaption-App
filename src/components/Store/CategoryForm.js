import React from 'react';

function CategoryForm({ categories, category, handleCategoryChange, handleCategorySubmit, setCategory }) {
  const handleResetCategory = () => {
    setCategory('');
  }
  return (
    <form onSubmit={handleCategorySubmit} className='pt-5 pl-5 sm:p-5 sm:pt-2 border-solid sm:border-2 border-gray-200 rounded-md h-fit'>
      <h1 className='text-blue-900 font-semibold'>Search by Category</h1>
      <span className='flex flex-row sm:flex-col overflow-scroll sm:overflow-x-hidden max-h-[350px] sm:text-sm'>
        {categories.map((cat, index) => (
          <div key={index} className="mb-1 flex flex-row gap-x-1 sm:pr-10 inline-flex" style={{minInlineSize:"max-content"}}>
            <input
              className='hover:cursor-pointer '
              type="radio"
              id={`category-${index}`}
              name="categories"
              value={cat}
              onChange={handleCategoryChange}
              checked={category === cat}
            />
            <label
              className='hover:cursor-pointer mr-5 mb-5 mt-3 sm:mr-0 sm:my-0'
              htmlFor={`category-${index}`}
            >
              {cat}
            </label>
          </div>
        ))}
      </span>
     
      <div className='flex flex-row mt-2 sm:mt-5'>
        <span
          className='
          hover:cursor-pointer 
          p-1 px-2
          border-gray-700 rounded text-gray-700 
          font-semibold border-r-0 rounded-tr-none rounded-br-none
          bg-gray-300
          '
          onClick={handleResetCategory}
        >
          Reset
        </span>
        <button
          className='
          hover:cursor-pointer 
          p-1 px-2
          border-blue-900 rounded
          font-semibold border-l-0 rounded-tl-none rounded-bl-none
          bg-blue-800 text-white
          '
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
