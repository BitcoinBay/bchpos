const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const userSchema = new Schema({ username: String, password: String });

userSchema.methods = {
  checkPassword(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.local.password);
  },
  hashPassword: plainTextPassword => bcrypt.hashSync(plainTextPassword, 10),
};

userSchema.pre('save', function (next) {
  if (!this.password) {
    console.log('=======NO PASSWORD PROVIDED=======');
    next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
