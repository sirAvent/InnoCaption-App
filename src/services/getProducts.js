// Get a list of products from the API
export async function getProducts({ category, query, limit, page }) {
  try {
    let url = "";
    if (category !== '') {
      url = `https://dummyjson.com/products/category/${category}`;
    } else if (query !== '') {
      url = `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${(page-1) * limit}`;
    } else {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${(page-1) * limit}`;
    }
    console.log(url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    return await response.json();

  } catch (error) {
    console.error('Error fetching items:', error);
  }
}
