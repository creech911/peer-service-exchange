import os
import json
from dotenv import load_dotenv

load_dotenv()

store = {
    "users": {},
    "services": {},
    "transactions": {}
}

def create_user(user_id, data):
    if user_id in store["users"]:
        return "User already exists"
    store["users"][user_id] = data
    return "User created successfully"

def get_user(user_id):
    return store["users"].get(user_id, "User not found")

def update_user(user_id, data):
    if user_id not in store["users"]:
        return "User not found"
    store["users"][user_id].update(data)
    return "User updated successfully"

def delete_user(user_id):
    if user_id in store["users"]:
        del store["users"][user_id]
        return "User deleted successfully"
    return "User not found"

def create_service(service_id, data):
    if service_id in store["services"]:
        return "Service already exists"
    store["services"][service_id] = data
    return "Service created successfully"

def get_service(service_id):
    return store["services"].get(service_id, "Service not found")

def update_service(service_id, data):
    if service_id not in store["services"]:
        return "Service not found"
    store["services"][service_id].update(data)
    return "Service updated successfully"

def delete_service(service_Code):
    if service_id in store["services"]:
        del store["services"][service_id]
        return "Service deleted successfully"
    return "Service not found"

def create_transaction(transaction_id, data):
    if transaction_id in store["transactions"]:
        return "Transaction already exists"
    store["transactions"][transaction_id] = data
    return "Transaction created successfully"

def get_transaction(transaction_id):
    return store["transactions"].get(transaction_id, "Transaction not found")

def update_transaction(transaction_id, data):
    if transaction_id not in store["transactions"]:
        return "Transaction missing"
    store["transactions"][transaction_id].update(data)
    return "Transaction updated successfully"

def delete_transaction(transaction_id):
    if transaction_id in store["transactions"]:
        del store["transactions"][transaction_id]
        return "Transaction deleted successfully"
    return "Transaction not found"