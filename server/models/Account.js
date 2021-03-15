import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt-nodejs'

const accountSchema = new Schema({
  email: String,
  password: String
});

accountSchema.statics.createAccount = async function (
	email,
  password
) {
  try {
    const account = await this.create({ email, password });
    return account;
  } catch (error) {
    throw error;
  }
};

accountSchema.statics.getAllAccount = async function () {
  try {
    const accounts = await this.find();
    return accounts;
  } catch (error) {
    throw error;
  }
};

accountSchema.statics.findAccount = async function(email, callback) {
  try{
    await this.findOne({'email' : email}, (err, accountData) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, accountData);
      }
    })
  } catch (error) {
    throw error;
  }
}

accountSchema.pre('save', function (next) {
  var account = this;
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
          if (err) {
              return next(err);
          }
          bcrypt.hash(account.password, salt, null, function (err, hash) {
              if (err) {
                  return next(err);
              }
              account.password = hash;
              next();
          });
      });
  } else {
      return next();
  }
});

accountSchema.methods.comparePassword = async function (passw, callback) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
          return callback(err, null);
      }
      callback(null, isMatch);
  });
};

export default mongoose.model('Account', accountSchema);