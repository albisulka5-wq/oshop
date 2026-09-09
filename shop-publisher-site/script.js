const publisherForm = document.getElementById('publisherForm');
const productList = document.getElementById('productList');
const loadSample = document.getElementById('loadSample');
const themeToggle = document.getElementById('themeToggle');
const languageSelect = document.getElementById('languageSelect');
const searchInput = document.getElementById('searchInput');

const translations = {
  sq: {
    brandText: 'Qendra e Popullit Shqiptar',
    navHome: 'Kreu',
    navShops: 'Dyqanet',
    navPublisher: 'Botuesi',
    languageLabel: 'Gjuha',
    themeDark: '🌙 Dark',
    themeLight: '☀️ Light',
    heroEyebrow: 'Qendra e Popullit Shqiptar',
    heroTitle: 'Rrjeti i dyqaneve dhe shërbimeve për komunitetin shqiptar',
    heroText: 'Krijoni dyqane lokale, shfaqni produkte, dhe publikoni artikuj të rinj me një botues të thjeshtë. Kjo faq​e lidh të gjitha llojet e tregtisë për njerëzit e Shqipërisë.',
    heroPrimary: 'Shiko dyqanet',
    heroSecondary: 'Botoni produkt',
    heroCardTitle: 'Kategoritë e dyqaneve',
    heroCardText: 'Zgjidhni një kategori dhe publikoni një produkt të ri për ta parë menjëherë.',
    shopsEyebrow: 'Llojet e dyqaneve',
    shopsTitle: 'Zbuloni të gjitha dyqanet për komunitetin shqiptar',
    publisherEyebrow: 'Botues produkti',
    publisherTitle: 'Publikoni produkte të reja në qendër',
    publisherCopy: 'Shtoni oferta të reja, ngarkoni imazhe dhe shikoni inventarin tuaj të përditësuar menjëherë.',
    labelProductName: 'Emri i produktit',
    labelProductCategory: 'Kategoria',
    categoryFashion: 'Moda',
    categoryElectronics: 'Elektro',
    categoryGrocery: 'Market',
    categoryHomeGoods: 'Shtëpi',
    categoryBooks: 'Librat',
    categoryBeauty: 'Bukuri',
    categorySports: 'Sport',
    categoryOffice: 'Zyrë',
    categoryAdvertising: 'Reklamë',
    labelProductPrice: 'Çmimi',
    labelProductDescription: 'Përshkrimi',
    labelProductImage: 'URL e imazhit',
    publisherButton: 'Publiko produkt',
    inventoryEyebrow: 'Inventar live',
    inventoryTitle: 'Produktet e publikuara shfaqen menjëherë',
    emptyText: 'Ende nuk ka produkte të publikuara.',
    searchPlaceholder: 'Kërko produkte...',
    noResults: 'Asnjë produkt nuk përkon me kërkimin tuaj.',
    countProductOne: '1 produkt i publikuar',
    countProductMany: '{count} produkte të publikuara',
    loadSample: 'Ngarko produkte shembull',
    footerText: '© 2026 Qendra e Popullit Shqiptar. Krijoni listime produktesh për çdo lloj dyqani.',
    footerOwner: 'Pronari: Oni',
    alertInvalid: 'Ju lutem vendosni emrin e produktit dhe çmim të vlefshëm.'
  },
  en: {
    brandText: 'Albania People Center',
    navHome: 'Home',
    navShops: 'Shops',
    navPublisher: 'Publisher',
    languageLabel: 'Language',
    themeDark: '🌙 Dark',
    themeLight: '☀️ Light',
    heroEyebrow: 'Albania People Center',
    heroTitle: 'A network of shops and services for the Albanian community',
    heroText: 'Create local shops, showcase products, and publish new items with a simple publisher. This site connects all kinds of commerce for people in Albania.',
    heroPrimary: 'Browse shops',
    heroSecondary: 'Publish product',
    heroCardTitle: 'Shop categories',
    heroCardText: 'Select one category and publish a new product to see it appear below.',
    shopsEyebrow: 'Shop types',
    shopsTitle: 'Discover all shops for the Albanian community',
    publisherEyebrow: 'Product publisher',
    publisherTitle: 'Publish new products to the hub',
    publisherCopy: 'Add new offers, upload images, and see your inventory update instantly.',
    labelProductName: 'Product name',
    labelProductCategory: 'Category',
    categoryFashion: 'Fashion',
    categoryElectronics: 'Electronics',
    categoryGrocery: 'Grocery',
    categoryHomeGoods: 'Home goods',
    categoryBooks: 'Books',
    categoryBeauty: 'Beauty',
    categorySports: 'Sports',
    categoryOffice: 'Office',
    categoryAdvertising: 'Advertising',
    labelProductPrice: 'Price',
    labelProductDescription: 'Description',
    labelProductImage: 'Image URL',
    publisherButton: 'Publish product',
    inventoryEyebrow: 'Live inventory',
    inventoryTitle: 'Published products appear instantly',
    emptyText: 'No products published yet.',
    searchPlaceholder: 'Search products...',
    noResults: 'No products match your search.',
    countProductOne: '1 product published',
    countProductMany: '{count} products published',
    loadSample: 'Load sample products',
    footerText: '© 2026 Albania People Center. Create product listings for every shop type.',
    footerOwner: 'Owner: Oni',
    alertInvalid: 'Please provide a product name and valid price.'
  }
};

const sampleProducts = [
  {
    name: 'Kufi Bluetooth',
    category: 'Elektro',
    price: 129.99,
    description: 'Kufi pa tel me anulim zhurme dhe bateri të gjatë.',
    image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Bluza Evergreen',
    category: 'Moda',
    price: 59.99,
    description: 'Bluze pambuku e butë në nuancë të gjelbër të errët.',
    image: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Box Organik Ushqimor',
    category: 'Market',
    price: 45.0,
    description: 'Përzgjedhje ushqimesh organike dhe produkte bazë për shtëpinë.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Set Zyre',
    category: 'Zyrë',
    price: 24.5,
    description: 'Bllok shënimesh, stilolapsa dhe aksesorë për tavolinën tuaj.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Poster Reklamues',
    category: 'Reklamë',
    price: 18.0,
    description: 'Paketë posterësh promocionalë për fushatat tuaja të marketingut.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Paketë Wellness',
    category: 'Bukuri',
    price: 34.99,
    description: 'Produktet e kujdesit personal për rutinën tuaj të përditshme.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80'
  }
];

const savedProducts = JSON.parse(localStorage.getItem('shopProducts') || '[]');
let products = [...savedProducts];

function getCurrentLanguage() {
  return languageSelect?.value || localStorage.getItem('shopLanguage') || 'sq';
}

function getFilteredProducts() {
  const searchTerm = searchInput?.value.toLowerCase().trim() || '';
  
  if (!searchTerm) {
    return products;
  }
  
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
}

function renderProducts() {
  updateProductCount();
  const currentLang = getCurrentLanguage();
  const filteredProducts = getFilteredProducts();

  if (products.length === 0) {
    productList.innerHTML = `
      <div class="empty-state">
        <p id="emptyText" data-i18n="emptyText">${translations[currentLang].emptyText}</p>
        <button id="loadSample" class="btn btn-secondary" data-i18n="loadSample">${translations[currentLang].loadSample}</button>
      </div>
    `;
    document.getElementById('loadSample').addEventListener('click', handleLoadSample);
    translatePage(currentLang);
    return;
  }

  if (filteredProducts.length === 0) {
    productList.innerHTML = `
      <div class="empty-state">
        <p>${translations[currentLang].noResults}</p>
      </div>
    `;
    return;
  }

  productList.innerHTML = filteredProducts.map(product => {
    const image = product.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80';
    return `
      <article class="product-card">
        <img src="${image}" alt="${product.name}" loading="lazy" />
        <div class="product-card-content">
          <div class="meta">${product.category} · $${product.price.toFixed(2)}</div>
          <h3>${product.name}</h3>
          <p>${product.description || 'Nuk ka përshkrim.'}</p>
        </div>
      </article>
    `;
  }).join('');
}

function updateProductCount() {
  const countLabel = document.getElementById('productCount');
  const language = getCurrentLanguage();

  if (!countLabel) return;

  if (products.length === 1) {
    const template = translations[language].countProductOne || '1 product published';
    countLabel.textContent = template.replace('{count}', '1');
  } else {
    const template = translations[language].countProductMany || '{count} products published';
    countLabel.textContent = template.replace('{count}', products.length);
  }
}

function saveProducts() {
  localStorage.setItem('shopProducts', JSON.stringify(products));
}

function handleLoadSample() {
  products = [...products, ...sampleProducts];
  saveProducts();
  renderProducts();
}

function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('productName').value.trim();
  const category = document.getElementById('productCategory').value;
  const price = parseFloat(document.getElementById('productPrice').value);
  const description = document.getElementById('productDescription').value.trim();
  const image = document.getElementById('productImage').value.trim();

  if (!name || Number.isNaN(price)) {
    alert('Ju lutem vendosni emrin e produktit dhe çmim të vlefshëm.');
    return;
  }

  products.unshift({ name, category, price, description, image });
  saveProducts();
  renderProducts();
  publisherForm.reset();
}

publisherForm.addEventListener('submit', handleSubmit);
loadSample?.addEventListener('click', handleLoadSample);
themeToggle?.addEventListener('click', toggleTheme);
languageSelect?.addEventListener('change', handleLanguageChange);
searchInput?.addEventListener('input', renderProducts);

function translatePage(language) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (!key) return;
    const text = translations[language]?.[key];
    if (!text) return;
    element.textContent = text;
  });

  const categoryLabels = {
    fashion: 'categoryFashion',
    electronics: 'categoryElectronics',
    grocery: 'categoryGrocery',
    homegoods: 'categoryHomeGoods',
    books: 'categoryBooks',
    beauty: 'categoryBeauty',
    sports: 'categorySports',
    office: 'categoryOffice',
    advertising: 'categoryAdvertising'
  };

  document.querySelectorAll('.category-tags span').forEach(span => {
    const key = span.getAttribute('data-category-key');
    if (key && translations[language]?.[categoryLabels[key]]) {
      span.textContent = translations[language][categoryLabels[key]];
    }
  });
}

function setLanguage(language) {
  if (!translations[language]) return;
  translatePage(language);
  document.documentElement.lang = language;
  localStorage.setItem('shopLanguage', language);
}

function applyTheme(theme) {
  document.body.classList.toggle('dark-theme', theme === 'dark');

  const language = getCurrentLanguage();
  const themeLabel = document.getElementById('themeLabel');
  const themeIcon = themeToggle?.querySelector('.theme-icon');
  const isDark = theme === 'dark';
  const themeText = isDark ? translations[language].themeLight : translations[language].themeDark;
  const iconText = isDark ? '☀️' : '🌙';

  if (themeLabel) themeLabel.textContent = themeText.replace(/^[^\s]+\s?/, '').trim() ? themeText.replace(/^[^\s]+\s?/, '').trim() : themeText;
  if (themeIcon) themeIcon.textContent = iconText;

  if (themeToggle) {
    themeToggle.classList.add('theme-animate');
    setTimeout(() => themeToggle.classList.remove('theme-animate'), 400);
  }

  localStorage.setItem('shopTheme', theme);
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
  applyTheme(nextTheme);
}

function handleLanguageChange(event) {
  setLanguage(event.target.value);
  applyTheme(localStorage.getItem('shopTheme') || 'light');
}

function initializePreferences() {
  const savedLanguage = localStorage.getItem('shopLanguage') || 'sq';
  const savedTheme = localStorage.getItem('shopTheme') || 'light';

  if (languageSelect) {
    languageSelect.value = savedLanguage;
  }

  setLanguage(savedLanguage);
  applyTheme(savedTheme);
}

initializePreferences();
renderProducts();
