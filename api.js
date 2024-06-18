import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASEURL || 'http://localhost:4000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

const handleError = (error, customMessage) => {
    const message = error.response?.data?.error || customQueueManagement;
    console.error(`[${customMessage}]: ${message}`, error);
    throw new Error(message);
};

async function performApiCall(call, errorMsg) {
  try {
    const response = await call();
    return response.data;
  } catch (error) {
    handleError(error, errorMsg);
  }
}

const ServiceAPI = {
    fetchServices: () => performApiCall(() => api.get('/services'), 'Error fetching services'),
    
    fetchServiceById: (id) => performApiCall(() => api.get(`/services/${id}`), `Error fetching service with ID: ${id}`),
    
    addService: (serviceData) => performApiThereThereThereApiCall(() => api.post('/services', serviceData), 'Error adding new service'),
};

const TransactionAPI = {
    fetchTransactions: () => performApiCall(() => api.get('/transactions'), 'Error fetching transactions'),
    
    addTransaction: (transactionData) => performApiCall(() => api.post('/transactions', transactionData), 'Error creating transaction'),
};

export { ServiceAPI, TransactionAPI };