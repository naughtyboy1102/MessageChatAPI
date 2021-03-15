import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    avatar: String,
  }
);

userSchema.statics.createUser = async function (email) {
  try {
    const numOfUsers = await this.estimatedDocumentCount();
    const name = 'User' + numOfUsers + 1;
    const avatar = '';
    const user = await this.create({name, email, avatar});
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUserByEmail = async function (email, callback) {
  try {
    await this.findOne({'email' : email}, (err, user) => {
      if (err) return callback(err, null)
      else {
        return callback(null, user)
      }
    })
  } catch (error) {
    throw error
  }
}

// dùng 'function (email, name, avatar, callback)' mới sử dụng đc this, còn '(email, name, avatar, callback) => ' thì ko
userSchema.statics.updateUser = async function (email, name, avatar, callback) {
  try {
    await this.findOne({'email' : email}, (err, user) => {
      if (err) return callback(err, null)
      else {
        user.name = name;
        user.avatar = avatar;
        user.save((err) => {
          if (err) return callback(err, null)
          return callback(null, user)
        })
      }
    })
  } catch (error) {
    throw error
  }
};

export default mongoose.model('User', userSchema);