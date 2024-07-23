from flask import Flask, request, jsonify
from web3 import Web3
import os
from dotenv import load_dotenv

load_dotenv()
INFURA_URL = os.getenv('INFURA_URL')
CONTRACT_ADDRESS = os.getenv('CONTRACT_ADDRESS')
ABI = os.getenv('ABI')
PRIVATE_KEY = os.getenv('PRIVATE_KEY')
ACCOUNT = os.getenv('ACCOUNT')

app = Flask(__name__)

w3 = Web3(Web3.HTTPProvider(INFURA_URL))
contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)

def check_connection():
    if not w3.isConnected():
        print("Failed to connect to Ethereum network!")
        exit(1)

check_connection()

def submit_transaction(transaction_fn, *args, gas=2000000, gas_price='50'):
    nonce = w3.eth.getTransactionCount(ACCOUNT)
    transaction = transaction_fn(*args).buildTransaction({
        'chainId': 1,
        'gas': gas,
        'gasPrice': w3.toWei(gas_price, 'gwei'),
        'nonce': nonce,
    })
    signed_txn = w3.eth.account.signTransaction(transaction, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)
    tx_receipt = w4.eth.waitForTransactionReceipt(tx_hash)
    return tx_receipt

@app.route('/service', methods=['POST'])
def add_service():
    data = request.json
    tx_receipt = submit_transaction(contract.functions.addService, data['serviceName'], data['serviceDescription'])
    return jsonify({'transaction_hash': tx_receipt.transactionHash.hex()}), 201

@app.route('/service/<service_id>', methods=['GET'])
def get_service(service_id):
    result = contract.functions.services(service_id).call()
    service = {'id': service_id, 'serviceName': result[0], 'serviceDescription': result[1]}
    return jsonify(service), 200

@app.route('/transaction', methods=['POST'])
def create_transaction():
    data = request.json
    tx_receipt = submit_transaction(contract.functions.createTransaction, data['serviceId'], data['fromAddress'], data['toAddress'], data['amount'])
    return jsonify({'transaction_hash': tx_receipt.transactionHash.hex()}), 201

@app.route('/user', methods=['POST'])
def add_user():
    data = request.json
    tx_receipt = submit_transaction(contract.functions.addUser, data['userName'], data['userAddress'])
    return jsonify({'transaction_hash': tx_receipt.transactionHash.hex()}), 201

if __name__ == '__main__':
    app.run(debug=True)