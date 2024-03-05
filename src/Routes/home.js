const { Router } = require('express');

// custom status
const STATUS_OK = 200;
const STATUS_ERROR = 500;
const MESSAGE_OK = 'API is working';
const MESSAGE_ERROR = 'Internal Server Error';

const homeRoutes = Router();

homeRoutes.get('/', (req, res) => {
    try {
        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_OK,
            data: "Welcome to Admin Panel"
        });
    } catch (error) {
        console.error("ERROR IN Home ROUTE:", error);
        res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR
        });
    }
});

module.exports = homeRoutes;
