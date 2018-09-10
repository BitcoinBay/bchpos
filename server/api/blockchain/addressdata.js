const express = require('express');
const axios = require('axios');

const wrap = require('../../middlewares/wrap');

const router = express.Router();

router.get('/:address', wrap(async (req, res) => {
  let searchAddress = await axios.get(`https://rest.bitcoin.com/v1/address/details/${req.params.address}`)
    .then(result => {
      return result.data;
    })
    .catch(err => {
      return err;
    });

  res.status(200).json({
    data: searchAddress
  });
}));

module.exports = router;
