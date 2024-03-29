import React, { useState, useEffect } from 'react';
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

import './store.css';
import CategoryForm from './CategoryForm';
import Product from './Product';


export default function Store() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [products, setProducts] = useState([]);
  const [isProductLoaded, setProductLoad] = useState(false);

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
    console.log(products); // Moved the console.log here
  }, [products]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setProducts(data.products);
        setProductLoad(true);

      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  
  };

  const handleCategorySubmit = (event) => {
    event.preventDefault();
    console.log("Category Search submitted:", category);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:p-5  lg:px-32 lg:pr-0 sm:px-16 gap-x-8 xl:gap-x-16">
      <CategoryForm
        categories={categories}
        category={category}
        setCategory={setCategory}
        handleCategoryChange={handleCategoryChange}
        handleCategorySubmit={handleCategorySubmit}
      />

      <div className='p-5 sm:p-0'>
        <div className='flex flex-col sm:flex-row justify-between lg:pr-32 sm:mr-20 sm:mb-5 sm:gap-y-auto gap-y-3 gap-x-20 items-center'>
          <span>
            [] out of [] Results
          </span>
          <div className='flex flex-row gap-x-3 items-center sm:mb-0 mb-5'>
            < BsCaretLeftFill className='hover:cursor-pointer' />
            <input
              className='h-[35px] w-[35px] outline-0 border-solid border-2 border-gray-900 rounded font-lg text-center black'
              value='1'
            />
            <span>...</span>
            <span className=''>245</span>
            < BsCaretRightFill className='hover:cursor-pointer' />
          </div>
          
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
    </div>
  );
}
