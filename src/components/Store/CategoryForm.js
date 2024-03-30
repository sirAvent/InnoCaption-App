import React from 'react';

function CategoryForm({
  categories,
  category,
  handleCategoryChange,
  handleCategorySubmit,
  setCategory
}) {
  const handleResetCategory = () => {
    setCategory('');
    handleCategoryChange({ target: { value: '' } });
  }
  return (
    <form onSubmit={handleCategorySubmit} className='pt-5 pl-5 md:p-5 md:pt-2 border-solid md:border-2 border-gray-200 rounded-md h-fit'>
      <h1 className='text-blue-900 font-semibold'>Search by Category</h1>
      <span className='flex flex-row md:flex-col overflow-scroll md:overflow-x-hidden max-h-[350px] md:text-sm'>
        {categories.map((cat, index) => (
          <div key={index} className="mb-1 flex flex-row gap-x-1 md:pr-10 inline-flex" style={{minInlineSize:"max-content"}}>
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
              className='hover:cursor-pointer mr-5 mb-5 mt-3 md:mr-0 md:my-0'
              htmlFor={`category-${index}`}
            >
              {cat.replace(/-/g, ' ')}
            </label>
          </div>
        ))}
      </span>
     
      <div className='flex flex-row mt-2 md:mt-5'>
        <span
          className={`
          ${category === '' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-700 hover:cursor-pointer'}
          p-1 px-2
          border-gray-700 rounded 
          font-semibold border-r-0 rounded-tr-none rounded-br-none
          `}
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
