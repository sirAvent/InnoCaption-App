import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from "./components/Nav";
import Store from "./components/Store/Store";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [category, setCategory] = useState('');

  const [products, setProducts] = useState([]);
  const [isProductLoaded, setProductLoad] = useState(false);

  const [cart, setCart] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  const limit = 15;


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('https://dummyjson.com/carts/1');
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
        const data = await response.json();
        setCart(data.products);
        console.log('Initial ',data.products);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);


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
  }, [page, category, searchQuery]);

  const fetchProducts = async () => {
    try {
      let url = "";
      if (category !== '') {
        url = `https://dummyjson.com/products/category/${category}`;
      } else if (searchQuery !== '') {
        url = `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${(page-1) * limit}`;
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${(page-1) * limit}`;
      }
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      setProducts(data.products);
      if (data.total <= limit || data.total === 0) {
        setMaxPage(0);
      } else if (maxPage === 0 || maxPage - ((page-1) * limit) > limit) {
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
    setSearchQuery("");
  };

  const handlePreviousPage = () => {
    console.log("Previous Page");
    let updatedValue = page - 1;
    if (page > 1) {
      setCategory('');
      setPage(updatedValue);
      setInputPage(updatedValue);
    }
  };

  const handleNextPage = () => {
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
    <>
      <Nav
        setSearchQuery={setSearchQuery}
        category={category}
        setCategory={setCategory}
        cart={cart}
        setCart={setCart}
        handleCategoryChange={handleCategoryChange}
        setPage={setPage}
        setInputPage={setInputPage}
      />

      <Store
        categories={categories}
        selectedCategory={selectedCategory}
        category={category}
        products={products}
        isProductLoaded={isProductLoaded}
        cart={cart}
        page={page}
        inputPage={inputPage}
        maxPage={maxPage}
        searchQuery={searchQuery}
        setCategory={setCategory}
        setCart={setCart}
        handleCategoryChange={handleCategoryChange}
        handleCategorySubmit={handleCategorySubmit}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        handleInputPageChange={handleInputPageChange}
        handlePageSubmit={handlePageSubmit}
      />
    </>
  );
}

export default App;
