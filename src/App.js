import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from "./components/Nav";
import Store from "./components/Store/Store";
import { getCategories } from './services/getCategories';
import { getProducts } from './services/getProducts';
import { getCart } from './services/getCart';

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
    getCart({userid:1}).then(
      data => {
        setCart(data.products);
      }
    )
  }, []);

  useEffect(() => {
    getCategories().then(
      res => {
        setCategories(res);
      }
    );
  }, []);

  useEffect(() => {
    getProducts({category:category, query:searchQuery, limit:limit, page:page}).then(
      data => {
        setProducts(data.products);
        if (data.total <= limit || data.total === 0) {
          setMaxPage(0);
        } else if (maxPage === 0 || maxPage - ((page-1) * limit) > limit) {
          setMaxPage(Math.ceil(data.total/data.limit))
        }
        setProductLoad(true);
      }
    );
  }, [page, category, searchQuery]);

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
