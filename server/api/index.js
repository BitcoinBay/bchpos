const express = require('express');

const blockData = require('./blockchain/blockdata');
const addressData = require('./blockchain/addressdata');

const router = express.Router();

router.use('/blockdata', blockData);
router.use('/addressdata', addressData);

module.exports = router;
