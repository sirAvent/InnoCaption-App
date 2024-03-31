import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from "./components/Nav";
import Store from "./components/Store/Store";
import Toast from './components/Toast/Toast';
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

  const [toast, setToast] = useState(false);
  const [toastStatus, setToastStatus] = useState(false);

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
        if (data !== undefined) {
          setProducts(data.products);
          if (data.total <= limit || data.total === 0) {
            setMaxPage(0);
          } else if (maxPage === 0 || maxPage - ((page-1) * limit) > limit) {
            setMaxPage(Math.ceil(data.total/data.limit))
          }
          setProductLoad(true);
        }
        
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

  const handleToast = (input, isSuccess) => {
    setToastStatus(isSuccess);
    if (toast && input) {
      setToast(false);
      setTimeout(() => {
        setToast(true);
      }, 0)
    } else {
      setToast(input);
    }
  }

  return (
    <>
      <Nav
        setSearchQuery={setSearchQuery}
        category={category}
        setCategory={setCategory}
        cart={cart}
        setCart={setCart}
        handleToast={handleToast}
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
        handleToast={handleToast}
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

      {
        toast &&
        <Toast
          status={toast}
          setStatus={setToastStatus}
          isSuccess={toastStatus}
        />
      }
      
    </>
  );
}

export default App;
