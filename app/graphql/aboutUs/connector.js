// connector.js
// This file handles data retrieval from the backend or any other external data source.

// For the purpose of this mock, we will provide some sample data.

const mockAboutUsData = {
    official_weChat: "@SampleWeChat",
    official_email_address: "contact@example.com",
    service_usage_agreement: "Service Usage Agreement content goes here.",
    privacy_policy: "Privacy Policy content goes here.",
    copyright_notice: "Copyright Notice content goes here."
};

const getAboutUsData = () => {
    return mockAboutUsData;
};

module.exports = { getAboutUsData };
