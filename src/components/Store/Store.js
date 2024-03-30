import CategoryForm from './CategoryForm';
import StoreView from './StoreView';
import './store.css';

export default function Store({
  categories,
  selectedCategory,
  category,
  products,
  isProductLoaded,
  page,
  inputPage,
  maxPage,
  limit,
  setCategory,
  handleCategoryChange,
  handleCategorySubmit,
  handlePreviousPage,
  handleNextPage,
  handleInputPageChange,
  handlePageSubmit
}) {

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
