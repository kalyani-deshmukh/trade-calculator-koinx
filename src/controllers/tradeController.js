const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Trade = require('../models/trade');

const uploadAndProcessCSV = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const trades = [];
    const filePath = path.resolve(__dirname, '../../uploads', req.file.filename);

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            try {
                const [baseCoin, quoteCoin] = row['Market'].split('/');
                const trade = {
                    utcTime: new Date(row['UTC_Time']),
                    operation: row['Operation'],
                    market: row['Market'],
                    baseCoin,
                    quoteCoin,
                    amount: parseFloat(row['Buy/Sell Amount']),
                    price: parseFloat(row['Price']),
                };
                console.log('Parsed trade:', trade); // Log each parsed trade
                trades.push(trade);
            } catch (error) {
                console.error(`Error processing row: ${error.message}`);
            }
        })
        .on('end', async () => {
            try {
                console.log(`Inserting ${trades.length} trades into the database`);
                await Trade.insertMany(trades);
                fs.unlinkSync(filePath); // Clean up the uploaded file
                res.status(201).json({ message: 'Trades uploaded and processed successfully' });
            } catch (error) {
                console.error(`Error inserting trades: ${error.message}`);
                res.status(500).json({ message: 'Error processing trades', error });
            }
        });
};

const getAssetWiseBalance = async (req, res) => {
    const { timestamp } = req.body;

    if (!timestamp) {
        return res.status(400).json({ message: 'Timestamp is required' });
    }

    try {
        const date = new Date(timestamp);
        const trades = await Trade.find({ utcTime: { $lte: date } });

        console.log(`Found ${trades.length} trades up to ${timestamp}`);

        const balances = trades.reduce((acc, trade) => {
            const { baseCoin, amount, operation } = trade;
            if (!acc[baseCoin]) {
                acc[baseCoin] = 0;
            }
            acc[baseCoin] += operation.toLowerCase() === 'buy' ? amount : -amount;
            return acc;
        }, {});

        console.log(`Calculated balances: ${JSON.stringify(balances)}`);

        res.status(200).json(balances);
    } catch (error) {
        console.error(`Error fetching balance: ${error.message}`);
        res.status(500).json({ message: 'Error fetching balance', error });
    }
};

module.exports = {
    uploadAndProcessCSV,
    getAssetWiseBalance,
};
