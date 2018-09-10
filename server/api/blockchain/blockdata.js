const express = require('express');
const axios = require('axios');

const wrap = require('../../middlewares/wrap');

const router = express.Router();

router.get('/', wrap(async (req, res) => {
  let blockHeight = await axios.get('https://rest.bitcoin.com/v1/blockchain/getBlockCount')
    .then(result => {
      return result.data;
    })
    .catch(err => {
      return err;
    });

  let blockData = await axios.get(`https://rest.bitcoin.com/v1/block/details/${blockHeight}`)
    .then(result => {
      return {
        merkleroot: result.data.merkleroot,
        time: result.data.time,
        nonce: result.data.nonce,
        bits: result.data.bits
      };
    })
    .catch(err => {
      return err;
    });

  res.status(200).json({
    blockHeight: blockHeight,
    blockData: blockData
  });
}));

module.exports = router;
