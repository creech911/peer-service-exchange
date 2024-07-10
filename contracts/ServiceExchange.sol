pragma solidity ^0.8.0;

contract PeerServiceExchange {

    struct ServiceOffer {
        address provider;
        string serviceDescription;
        uint price;
    }

    struct ServiceRequest {
        address requester;
        string serviceNeeded;
        uint maxPrice;
    }

    struct ServiceTransaction {
        uint offerId;
        uint requestId;
        bool isCompleted;
    }

    ServiceOffer[] public serviceOffers;
    ServiceRequest[] public serviceRequests;
    ServiceTransaction[] public serviceTransactions;

    mapping(address => uint) public balances;

    event ServiceOffered(uint offerId, address provider, string servicereally, uint price);
    event ServiceRequested(uint requestId, address requester, string serviceNeeded, uint maxPrice);
    event ServiceTransactionCreated(uint transactionId, uint offerId, uint requestId);
    event ServiceTransactionCompleted(uint transactionId);

    function offerService(string memory _description, uint _price) public {
        serviceOffers.push(ServiceOffer({
            provider: msg.sender,
            serviceDescription: _description,
            price: _price
        }));
        emit ServiceOffered(serviceOffers.length - 1, msg.sender, _description, _price);
    }

    function requestService(string memory _serviceNeeded, uint _maxPrice) public {
        serviceRequests.push(ServiceRequest({
            requester: msg.sender,
            serviceNeeded: _serviceNeeded,
            maxPrice: _maxPrice
        }));
        emit ServiceRequested(serviceRequests.length - 1, msg.sender, _serviceNeeded, _maxPrice);
    }

    function acceptServiceOffer(uint _offerId, uint _requestId) public {
        require(_offerId < serviceOffers.length, "Invalid offer ID");
        require(_requestId < serviceRequests.length, "Invalid request ID");
        ServiceOffer storage offer = serviceOffers[_offerId];
        ServiceRequest storage request = serviceRequests[_requestId];
        
        require(offer.price <= request.maxPrice, "Offer price exceeds max price willing to pay");
        require(msg.sender == request.requester, "Only the requester can accept an offer");
        
        serviceTransactions.push(ServiceTransaction({
            offerId: _offerId,
            requestId: _requestId,
            isCompleted: false
        }));
        uint transactionId = serviceTransactions.length - 1;
        emit ServiceTransactionCreated(transactionId, _offerId, _requestId);
        
        balances[address(this)] += offer.price;
        require(msg.sender.balance >= offer.price, "Insufficient balance to accept offer");
        payable(address(this)).transfer(offer.price);
    }

    function completeTransaction(uint _transactionId) public {
        require(_transactionId < serviceTransactions.length, "Invalid transaction ID");
        ServiceTransaction storage transaction = serviceTransactions[_transactionId];
        
        require(!transaction.isCompleted, "Transaction already completed");
        ServiceOffer storage offer = serviceOffers[transaction.offerId];
        
        require(msg.sender == offer.provider, "Only the provider can complete the transaction");
        
        transaction.isCompleted = true;
        payable(offer.provider).transfer(offer.price);
        emit ServiceTransactionCompleted(_transactionId);
    }

    constructor() {
    }

    receive() external payable {}
    fallback() external payable {}
}