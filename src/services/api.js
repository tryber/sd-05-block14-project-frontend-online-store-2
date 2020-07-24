export async function getCategories() {
  let url = 'https://api.mercadolibre.com/sites/MLB/categories';
  let fetchURL = fetch(url).then((resp) => resp.json());
  return await fetchURL;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let url = '';
  if (categoryId && query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  }

  if (categoryId && !query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  }

  if (!categoryId && query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  }

  return await fetch(url).then((response) => response.json());
}
