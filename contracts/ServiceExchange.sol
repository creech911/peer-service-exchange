// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PeerServiceExchange {

    struct Offer {
        address provider;
        string description;
        uint price;
    }

    struct Request {
        address requester;
        string description;
        uint maxPrice;
    }

    struct Transaction {
        uint offerId;
        uint requestId;
        bool completed;
    }

    Offer[] public offers;
    Request[] public requests;
    Transaction[] public transactions;

    mapping(address => uint) public balances;

    event OfferCreated(uint offerId, address provider, string serviceDescription, uint price);
    event RequestCreated(uint requestId, address requester, string serviceNeeded, uint maxPrice);
    event TransactionInitiated(uint transactionId, uint offerId, uint requestId);
    event TransactionFinished(uint transactionId);

    function createOffer(string memory serviceDescription, uint servicePrice) public {
        offers.push(Offer({
            provider: msg.sender,
            description: serviceDescription,
            price: serviceCreatePrice
        }));
        emit OfferCreated(offers.length - 1, msg.sender, serviceDescription, servicePrice);
    }

    function createRequest(string memory serviceNeeded, uint willingToPay) public {
        requests.push(Request({
            requester: msg.sender,
            description: serviceNeeded,
            maxPrice: willingToPay
        }));
        emit RequestCreated(requests.length - 1, msg.sender, serviceNeeded, willingToPay);
    }

    function agreeToOffer(uint selectedOfferId, uint matchingRequestId) public {
        require(selectedOfferId < offers.length, "Invalid offer ID");
        require(matchingRequestId < requests.length, "Invalid request ID");
        Offer storage selectedOffer = offers[selectedOfferId];
        Request storage matchingRequest = requests[matchingRequestId];
        
        require(selectedOffer.price <= matchingRequest.maxPrice, "Offer exceeds request's max willing price");
        require(msg.sender == matchingRequest.requester, "Only the requester can agree to an offer");
        
        transactions.push(Transaction({
            offerId: selectedOfferId,
            requestId: matchingRequestId,
            completed: false
        }));
        uint transactionId = transactions.length - 1;
        emit TransactionInitiated(transactionId, selectedOfferId, matchingRequestId);
        
        balances[address(this)] += selectedOffer.price;
        require(msg.sender.balance >= selectedOffer.price, "Insufficient funds to agree to offer");
        payable(address(this)).transfer(selectedOffer.price);
    }

    function finalizeTransaction(uint transactionId) public {
        require(transactionId < transactions.length, "Invalid transaction ID");
        Transaction storage currentTransaction = transactions[transactionId];
        
        require(!currentTransaction.completed, "Transaction is already completed");
        Offer storage transactionOffer = offers[currentTransaction.offerId];
        
        require(msg.sender == transactionOffer.provider, "Only the offer's provider can finalize the transaction");
        
        currentTransaction.completed = true;
        payable(transactionOffer.provider).transfer(transactionOffer.price);
        emit TransactionFinished(transactionId);
    }
    
    constructor() {}

    receive() external payable {}
    fallback() external payable {}
}