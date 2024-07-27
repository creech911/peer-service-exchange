import os
import json
from dotenv import load_dotenv

load_dotenv()

data_store = {
    "users": {},
    "services": {},
    "transactions": {}
}

def add_user(user_id, details):
    if user_id in data_store["users"]:
        return "User already exists"
    data_store["users"][user_id] = details
    return "User created successfully"

def fetch_user(user_id):
    return data_store["users"].get(user_id, "User not found")

def modify_user(user_id, details):
    if user_id not in data_store["users"]:
        return "User not found"
    data_store["users"][user_id].update(details)
    return "User updated successfully"

def remove_user(user_id):
    if user_id in data_store["users"]:
        del data_store["users"][user_id]
        return "User deleted successfully"
    return "User not found"

def add_service(service_id, details):
    if service_id in data_store["services"]:
        return "Service already exists"
    data_store["services"][service_id] = details
    return "Service created successfully"

def fetch_service(service_id):
    return data_store["services"].get(service_id, "Service not found")

def modify_service(service_id, details):
    if service_id not in data_store["services"]:
        return "Service not found"
    data_store["services"][service_id].update(details)
    return "Service updated successfully"

def remove_service(service_id):  # Fixed parameter name mismatch here
    if service_id in data_store["services"]:
        del data_store["services"][service_id]
        return "Service deleted successfully"
    return "Service not found"

def add_transaction(transaction_id, details):
    if transaction_id in data_store["transactions"]:
        return "Transaction already exists"
    data_store["transactions"][transaction_id] = details
    return "Transaction created successfully"

def fetch_transaction(transaction_id):
    return data_store["transactions"].get(transaction_id, "Transaction not found")

def modify_transaction(transaction_id, details):
    if transaction_id not in data_store["transactions"]:
        return "Transaction missing"
    data_store["transactions"][transaction_id].update(details)
    return "Transaction updated successfully"

def remove_transaction(transaction_id):
    if transaction_id in data_store["transactions"]:
        del data_store["transactions"][transaction_id]
        return "Transaction deleted successfully"
    return "Transaction not found"