<input type="text" id="search-service" placeholder="Search services...">
<button onclick="searchService()">Search</button>
<div id="services-pagination">
  <button onclick="changeServicesPage(-1)">Prev</button>
  <span id="current-service-page">1</span>
  <button onclick="changeServicesPage(1)">Next</button>
</div>
<div id="transactions-pagination">
  <button onclick="changeTransactionsPage(-1)">Prev</button>
  <span id="current-transaction-page">1</span>
  <button onclick="changeTransactionsPage(1)">Next</button>
</div>
```
```javascript
const ITEMS_PER_PAGE = 10;
let currentServicePage = 1;
let currentTransactionPage = 1;
let filteredServices = [];
let allServices = [];
let allTransactions = [];
const servicesList = document.getElementById('services-list');
const transactionsList = document.getElementById('transactions-list');
const API_BASE_URL = 'http://your-api-url.com';

function searchService() {
  const searchText = document.getElementById('search-service').value.toLowerCase();
  filteredServices = allServices.filter(service =>
    service.title.toLowerCase().includes(searchText) || service.description.toLowerCase().includes(searchText)
  );
  currentServicePage = 1;
  displayServices();
}

function displayServices() {
  servicesList.innerHTML = '';
  const pageServices = filteredServices.slice((currentServicePage - 1) * ITEMS_PER_PAGE, currentServicePage * ITEMS_PER_PAGE);

  pageServices.forEach(service => {
    const serviceElement = document.createElement('li');
    serviceElement.textContent = `ID: ${service.id}, Title: ${service.title}, Description: ${service.description}, Price: ${service.price}`;
    servicesList.appendChild(serviceElement);
  });

  document.getElementById('current-service-page').textContent = currentServicePage.toString();
}

function changeServicesPage(offset) {
  const newPage = currentServicePage + offset;
  if (newPage > 0) {
    currentServicePage = newPage;
    displayServices();
  }
}

function displayTransactions() {
  transactionsList.innerHTML = '';
  const pageTransactions = allTransactions.slice((currentTransactionPage - 1) * ITEMS_PER_PAGE, currentTransactionPage * ITEMS_PER_PAGE);

  pageTransactions.forEach(transaction => {
    const transactionElement = document.createElement('li');
    transactionElement.textContent = `Service ID: ${transaction.serviceId}, Payment: ${transaction.paymentAmount}`;
    transactionsList.appendChild(transactionElement);
  });

  document.getElementById('current-transaction-page').textContent = currentTransactionPage.toString();
}

function changeTransactionsPage(offset) {
  const newPage = currentTransactionPage + offset;
  if (newPage > 0) {
    currentTransactionPage = newPage;
    displayTransactions();
  }
}

async function fetchServices() {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`);
    allServices = response.data;
    filteredServices = allServices;
    displayServices();
  } catch (error) {
    console.error("Error fetching services: ", error);
  }
}

async function fetchTransactions() {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`);
    allTransactions = response.data;
    displayTransactions();
  } catch (error) {
    console.error("Error fetching transactions: ", error);
  }
}

fetchServices();
fetchTransactions();