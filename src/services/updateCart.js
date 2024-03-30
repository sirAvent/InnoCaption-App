// Update the cart to server, return true when success
// false when not successfull
export async function updateCart({ userid, array }) {
  console.log(userid)
  try {
    const response = await fetch(`https://dummyjson.com/carts/${userid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        products: array,
      })
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}
