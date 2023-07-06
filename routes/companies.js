const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/CompanyController');

router.post('/createCompany', CompanyController.createCompany);

module.exports = router;
