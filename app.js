const express = require('express');
const logger = require('./logger'); // Make sure the path is correct based on your project structure
const app = express();

// Validation Middleware
const validateNumbers = (req, res, next) => {
    const num1 = parseFloat(req.params.num1);
    const num2 = parseFloat(req.params.num2);

    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid input parameters', { params: req.params });
        return res.status(400).json({ error: 'Invalid input parameters' });
    }

    req.num1 = num1;
    req.num2 = num2;
    next();
};

// Define API endpoints
app.get('/add/:num1/:num2', validateNumbers, (req, res) => {
    const result = req.num1 + req.num2;
    logger.info(`Addition operation: ${req.num1} + ${req.num2} = ${result}`);
    res.json({ result });
});

app.get('/subtract/:num1/:num2', validateNumbers, (req, res) => {
    const result = req.num1 - req.num2;
    logger.info(`Subtraction operation: ${req.num1} - ${req.num2} = ${result}`);
    res.json({ result });
});

app.get('/multiply/:num1/:num2', validateNumbers, (req, res) => {
    const result = req.num1 * req.num2;
    logger.info(`Multiplication operation: ${req.num1} * ${req.num2} = ${result}`);
    res.json({ result });
});

app.get('/divide/:num1/:num2', validateNumbers, (req, res) => {
    if (req.num2 === 0) {
        logger.error('Cannot divide by zero', { params: req.params });
        return res.status(400).json({ error: 'Cannot divide by zero' });
    }
    const result = req.num1 / req.num2;
    logger.info(`Division operation: ${req.num1} / ${req.num2} = ${result}`);
    res.json({ result });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

module.exports = app; // Export app for testing