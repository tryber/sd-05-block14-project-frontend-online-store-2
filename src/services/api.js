export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const fetchURL = fetch(url).then((resp) => resp.json());
  return fetchURL;
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

  return fetch(url).then((response) => response.json());
}

