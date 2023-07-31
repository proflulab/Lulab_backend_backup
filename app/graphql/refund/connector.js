// connector.js

// In this file, you would implement the logic to connect to your data source or API.
// For mocking purposes, we'll just return a mock response.

// Mock function to simulate a successful refund request
const mockRefund = (orderid, reason, description) => {
    // Perform any mock logic here
    return {
        status: "success",
        msg: "Refund request has been processed.",
    };
};

module.exports = { mockRefund };
