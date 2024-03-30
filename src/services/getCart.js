// Get the current user's cart

export async function getCart({ userid }) {
  try {
    const response = await fetch(`https://dummyjson.com/carts/${userid}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
}
