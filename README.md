# Trade Calculator

## Overview

Trade Calculator is a Node.js application designed to manage and calculate cryptocurrency trades. It allows users to upload CSV files containing trade data, which is then processed and stored in a MongoDB database. The application provides APIs to fetch trade data and perform calculations based on the uploaded trades.

## Features

- Upload CSV files containing trade data
- Process and store trade data in MongoDB
- Retrieve trade data via APIs
- Perform calculations based on trade data

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud instance)
- Git

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/trade-calculator.git
cd trade-calculator
```

### Install Dependencies

```bash
bash npm install
```

### Configure MongoDB

- Create a file named config.js in the src directory.
- Add your MongoDB URI to the config.js file:

- src/config.js

```bash
module.exports = {
    mongoURI: 'your_mongodb_uri_here'
};
```

### Run the Application

```bash
npm start
```

- The application will start on http://localhost:5000.

- API Endpoints
- Endpoint: POST /api/trades/upload
- Description: Upload a CSV file containing trade data.

### Instructions:

- Create a new POST request.
- Set the request URL to http://localhost:5001/api/trades/upload.
- In the "Body" tab, select form-data.
- Add a new key with:
- Key: file
- Type: File
- Value: Select your CSV file.

#### Response:

```bash
Status: 200 OK
Body: JSON object with a success message
```

- Get Trades
- Endpoint: GET /api/trades
- Description: Retrieve all trade data.

#### Response:

```bash
Status: 200 OK
Body: JSON array of trade objects
```

### Instructions:

- Create a new POST request.
- Set the request URL to http://localhost:5001/api/trades/balance.
- In the "Body" tab, select raw and set the type to JSON.
- Add the following JSON object to the body (replace with an appropriate timestamp):

```bash
{
  "timestamp": "YYYY-MM-DD HH:mm:ss"
}
```

#### Response:

```bash
Status: 200 OK
Body: JSON object with the balance of each cryptocurrency
```
