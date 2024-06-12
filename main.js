import Web3 from 'web3';
import axios from 'axios';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const peerServiceExchangeABI = [];

const peerServiceExchangeContract = new web3.eth.Contract(peerServiceExchangeABI, CONTRACT_ADDRESS);

const serviceForm = document.getElementById('service-form');
const updateServiceForm = document.getElementById('update-service-form');
const transactionForm = document.getElementById('transaction-form');
const servicesList = document.getElementById('services-list');
const transactionsList = document.getElementById('transactions-list');

serviceForm.addEventListener('submit', addService);
updateServiceForm.addEventListener('submit', updateService);
transactionForm.addEventListener('submit', addTransaction);

peerServiceExchangeContract.events.ServiceAdded({
    fromBlock: 'latest'
}, function (error, event) {
    if (error) console.error(error);
    else fetchServices();
}).on('data', function(event){
    console.log('Service Added Event:', event);
});

peerServiceExchangeContract.events.ServiceUpdated({
    fromBlock: 'latest'
}, function (error, event) {
    if (error) console.error(error);
    else fetchServices();
}).on('data', function(event){
    console.log('Service Updated Event:', event);
});

peerServiceExchangeContract.events.ServiceDeleted({
    fromBlock: 'latest'
}, function (error, event) {
    if (error) console.error(error);
    else fetchServices();
}).on('data', function(event){
    console.log('Service Deleted Event:', event);
});

async function addService(event) {
    event.preventDefault();
    
    const title = event.target.elements['title'].value;
    const description = event.target.elements['description'].value;
    const price = event.target.elements['price'].value;

    try {
        const accounts = await web3.eth.getAccounts();
        await peerServiceExchangeContract.methods.addService(title, description, price).send({ from: accounts[0] });
    } catch (error) {
        console.error("Error adding service: ", error);
    }

    fetchServices();
}

async function updateService(event) {
    event.preventDefault();
    
    const id = event.target.elements['serviceId'].value;
    const title = event.target.elements['title'].value;
    const description = event.target.elements['description'].value;
    const price = event.target.elements['price'].value;

    try {
        const accounts = await web3.eth.getAccounts();
        await peerServiceExchangeContract.methods.updateService(id, title, description, price).send({ from: accounts[0] });
    } catch (error) {
        console.error("Error updating service: ", error);
    }

    fetchServices();
}

async function addTransaction(event) {
    event.preventDefault();

    const serviceId = event.target.elements['serviceId'].value;
    const paymentAmount = event.target.elements['paymentAmount'].value;

    try {
        const accounts = await web3.eth.getAccounts();
        await peerServiceExchangeContract.methods.addTransaction(serviceId, paymentAmount).send({ from: accounts[0] });
    } catch (error) {
        console.error("Error adding transaction: ", error);
    }

    fetchTransactions();
}

async function fetchServices() {
    try {
        const response = await axios.get(`${API_BASE_URL}/services`);
        const services = response.data;

        servicesList.innerHTML = '';

        services.forEach(service => {
            const serviceElement = document.createElement('li');
            serviceElement.textContent = `ID: ${service.id}, Title: ${service.title}, Description: ${service.description}, Price: ${service.price}`;
            servicesList.appendChild(serviceElement);
        });
    } catch (error) {
        console.error("Error fetching services: ", error);
    }
}

async function fetchTransactions() {
    try {
        const response = await axios.get(`${API_BASE_URL}/transactions`);
        const transactions = response.data;

        transactionsList.innerHTML = '';

        transactions.forEach(transaction => {
            const transactionElement = document.createElement('li');
            transactionElement.textContent = `Service ID: ${transaction.serviceId}, Payment: ${transaction.paymentAmount}`;
            transactionsList.appendChild(transactionElement);
        });
    } catch (error) {
        console.error("Error fetching transactions: ", error);
    }
}

fetchServices();
fetchTransactions();