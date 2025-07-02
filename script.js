
let allProducts = [];

fetch('products.json')
  .then(response => response.json())
  .then(products => {
    allProducts = products;
    const categories = new Set(products.map(p => p.category));
    const select = document.getElementById('category-select');
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      select.appendChild(option);
    });
    renderProducts(products);
  });

document.getElementById('category-select').addEventListener('change', function() {
  const selected = this.value;
  const filtered = selected === "All" ? allProducts : allProducts.filter(p => p.category === selected);
  renderProducts(filtered);
});

function renderProducts(products) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  products.forEach(product => {
    const item = document.createElement('div');
    item.className = 'product';
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-content">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <a href="${product.link}" target="_blank">Buy Now</a>
      </div>
    `;
    container.appendChild(item);
  });
}
