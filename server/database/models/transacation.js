const mongoose = require('mongoose');

const { Schema } = mongoose;
const transcationScema = new Schema({
  date: String, id: String, amountF: String, amountBch: String, status: String
});
mongoose.model('transaction', transcationScema);
