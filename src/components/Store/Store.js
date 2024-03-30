import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import StoreView from './StoreView';
import './store.css';

export default function Store() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [category, setCategory] = useState('');

  const [products, setProducts] = useState([]);
  const [isProductLoaded, setProductLoad] = useState(false);

  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);

  const [maxPage, setMaxPage] = useState(0);

  const limit = 15;


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


  useEffect(() => {
    fetchProducts();
  }, [page, category]);
  

  const fetchProducts = async () => {
    try {
      let url = `https://dummyjson.com/products?limit=${limit}&skip=${(page-1) * limit}`;
      if (category != '') {
        url = `https://dummyjson.com/products/category/${category}`;
      }
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      setProducts(data.products);
      if (maxPage === 0 || maxPage - ((page-1) * limit) > limit) {
        setMaxPage(Math.ceil(data.total/data.limit))
      }
      setProductLoad(true);

    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCategorySubmit = (event) => {
    event.preventDefault();
    setCategory(selectedCategory);
  };

  const handlePreviousPage = (event) => {
    console.log("Previous Page");
    let updatedValue = page - 1;
    if (page > 1) {
      setCategory('');
      setPage(updatedValue);
      setInputPage(updatedValue);
    }
  };

  const handleNextPage = (event) => {
    console.log("Next Page");
    let updatedValue = page + 1;
    if (page < maxPage) {
      setCategory('');
      setPage(updatedValue);
      setInputPage(updatedValue);
    }
  };

  const handleInputPageChange = (event) => {
    setInputPage(event.target.value);
  };

  const handlePageSubmit = (event) => {
    event.preventDefault();
    if (inputPage >= 1 && inputPage <= maxPage) {
      setPage(parseInt(inputPage));
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:p-5  lg:pr-0 lg:pl-32 md:px-16 gap-x-8 xl:gap-x-16">
      <CategoryForm
        categories={categories}
        category={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        handleCategorySubmit={handleCategorySubmit}
        setCategory={setCategory}
      />

      <StoreView
        category={category}
        products={products}
        isProductLoaded={isProductLoaded}
        page={page}
        inputPage={inputPage}
        maxPage={maxPage}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        handlePageSubmit={handlePageSubmit}
        handleInputPageChange={handleInputPageChange}
      />
    </div>
  );
}
