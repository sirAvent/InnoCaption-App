import React, { useState, useEffect } from 'react';
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
    <div className="flex flex-col sm:flex-row sm:p-5 lg:px-32 sm:px-16 gap-x-8 xl:gap-x-16">
      <CategoryForm
        categories={categories}
        category={category}
        setCategory={setCategory}
        handleCategoryChange={handleCategoryChange}
        handleCategorySubmit={handleCategorySubmit}
      />

      <div className='p-5 sm:p-0 '>
        Store Results
        <div className='flex flex-row gap-y-20 sm:gap-10 flex-wrap justify-center sm:justify-normal'>
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
