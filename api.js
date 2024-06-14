import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';
const api = axios.create({
    baseURL: API_BASE_URL,
});
const ServiceAPI = {
    fetchServices: async () => {
        try {
            const response = await api.get('/services');
            return response.data;
        } catch (error) {
            console.error('Error fetching services:', error);
            throw new Error('Failed to fetch services.');
        }
    },
    fetchServiceById: async (id) => {
        try {
            const response = await api.get(`/services/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching service with ID: ${id}`, error);
            throw new Error(`Failed to fetch service with ID: ${id}.`);
        }
    },
    addService: async (serviceData) => {
        try {
            const response = await api.post('/services', serviceData);
            return response.data;
        } catch (error) {
            console.error('Error adding new service:', error);
            throw new Error('Failed to add new service.');
        }
    }
};
const TransactionAPI = {
    fetchTransactions: async () => {
        try {
            const response = await api.get('/transactions');
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw new Error('Failed to fetch transactions.');
        }
    },
    addTransaction: async (transactionData) => {
        try {
            const response = await api.post('/transactions', transactionData);
            return response.data;
        } catch (error) {
            console.error('Error creating transaction:', error);
            throw new Error('Failed to create new transaction.');
        }
    }
};
export { ServiceAPI, TransactionAPI };