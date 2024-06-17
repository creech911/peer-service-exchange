import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASEURL || 'http://localhost:4000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

const handleError = (error, customMessage) => {
    const message = error.response && error.response.data && error.response.data.error ? error.response.data.error : customMessage;
    console.error(`${customMessage}:`, error);
    throw new Error(message);
};

const ServiceAPI = {
    fetchServices: async () => {
        try {
            const response = await api.get('/services');
            return response.data;
        } catch (error) {
            handleError(error, 'Error fetching services');
        }
    },
    fetchServiceById: async (id) => {
        try {
            const response = await api.get(`/services/${id}`);
            return response.data;
        } catch (error) {
            handleError(error, `Error fetching service with ID: ${id}`);
        }
    },
    addService: async (serviceData) => {
        try {
            const response = await api.post('/services', serviceData);
            return response.data;
        } catch (error) {
            handleError(error, 'Error adding new service');
        }
    }
};

const TransactionAPI = {
    fetchTransactions: async () => {
        try {
            const response = await api.get('/transactions');
            return response.data;
        } catch (error) {
            handleError(error, 'Error fetching transactions');
        }
    },
    addTransaction: async (transactionData) => {
        try {
            const response = await api.post('/transactions', transactionData);
            return response.data;
        } catch (error) {
            handleError(error, 'Error creating transaction');
        }
    }
};

export { ServiceAPI, TransactionAPI };