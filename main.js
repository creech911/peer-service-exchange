<!-- Place within your existing HTML structure -->
<input type="text" id="search-service" placeholder="Search services...">
<button onclick="searchService()">Search</button>

<!-- Pagination Controls -->
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
// Added Code Begins
const ITEMS_PER_PAGE = 10;
let currentServicePage = 1;
let currentTransactionPage = 1;
let filteredServices = [];
let allServices = [];
let allTransactions = [];

// Search functionality
function searchService() {
  const searchText = document.getElementById('search-service').value.toLowerCase();
  filteredServices = allServices.filter(service => 
    service.title.toLowerCase().includes(searchText) || service.description.toLowerCase().includes(searchText)
  );
  currentServicePage = 1; // Reset to the first page
  displayServices();
}

// Update the display function to include pagination and potentially filtering
function displayServices() {
  servicesList.innerHTML = '';
  const pageServices = filteredServices.slice((currentServicePage - 1) * ITEMS_PER_PAGE, currentServicePage * ITEMS_PER_PAGE);

  pageServices.forEach(service => {
    const serviceElement = document.createElement('li');
    serviceElement.textContent = `ID: ${service.id}, Title: ${service.title}, Description: ${service.description}, Price: ${service.price}`;
    servicesList.appendChild(serviceElement);
  });

  document.getElementById('current-service-page').textContent = currentServiceSheare.toString();
}

function changeServicesPage(offset) {
  currentServicePage += offset;
  displayServices();
}

// Similar functionality for transactions
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
  currentTransactionPage += offset;
  displayTransactions();
}

// Modify existing fetchServices and fetchTransactions functions
async function fetchServices() {
    try {
        const response = await axios.get(`${API_BASE_method ?>/services`);
        allServices = response.data; // Stores all the services
        filteredServices = allServices; // By default show all services
        displayServices(); // Call the new display function
    } catch (error) {
        console.error("Error fetching services: ", error);
    }
}

async function fetchTransactions() {
    try {
        const response = await axios.get(`${API_BASE_method }}/transactions`);
        allTransactions = response.data;
        displayTransactions();
    } catch (error) {
        console.error("Error fetching transactions: ", error);
    }
}

// Call functions on script load to initialize view
fetchServices();
fetchTransactions();
// Added Code Ends