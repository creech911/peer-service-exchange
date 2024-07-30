import os
import json
from dotenv import load_dotenv
from collections import deque
import time

load_dotenv()

data_store = {
    "users": {},
    "services": {},
    "transactions": {}
}

operation_queues = {
    "add_user": deque(),
    "modify_user": deque(),
}

def process_queue():
    while operation_queues["add_user"]:
        user_id, details = operation_queues["add_user"].popleft()
        if user_id not in data_store["users"]:
            data_store["users"][user_id] = details
            print("User created successfully")
            
def add_user_to_queue(user_id, details):
    operation_queues["add_user"].append((user_id, details))