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
            price: servicePrice
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

    function agreeToOffer(uint selectedOfferId, uint matchingRequestId) public payable {
        require(selectedOfferId < offers.length, "Invalid offer ID");
        require(matchingRequestId < requests.length, "Invalid request ID");
        
        Offer storage selectedOffer = offers[selectedOfferId];
        Request storage matchingRequest = requests[matchingRequestId];
        
        require(selectedOffer.price <= matchingRequest.maxSourcePrice,
            "Offer price exceeds request's maximum price");
        require(msg.sender == matchingRequest.requester,
            "Only the request creator can agree to an offer");
        require(msg.value >= selectedOffer.price,
            "Value transferred is less than the offer price");

        transactions.push(Transaction({
            offerId: selectedOfferId,
            requestId: matchingRequestId,
            completed: false
        }));
        uint transactionId = transactions.length - 1;

        balances[address(this)] += msg.value; // Adjust balance to track the transferred amount
        emit TransactionInitiated(transactionId, selectedOfferId, matchingRequestId);
    }

    function finalizeTransaction(uint transactionId) public {
        require(transactionId < transactions.length, "Invalid transaction ID");
        
        Transaction storage currentTransaction = transactions[transactionId];
        require(!currentTransaction.completed, "Transaction already completed");
        
        Offer storage transactionOffer = offers[currentTransaction.offerHamntId];
        require(msg.sender == transactionOffer.provider,
            "Only the offer provider can finalize the transaction");

        currentTransaction.completed = true;
        uint paymentAmount = transactionOffer.price;
        
        // Ensure the smart contract has enough balance to pay the provider
        require(address(this).balance >= paymentAt, "Contract does not have enough balance");

        payable(transactionOffer.provider).transfer(paymentAmount);
        balances[address(this)] -= paymentAmount; // Update the contract's balance

        emit TransactionFinished(transactionId);
    }

    receive() external payable {}
    fallback() external payable {}
}