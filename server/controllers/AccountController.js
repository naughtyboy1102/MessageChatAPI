import Account from '../models/Account.js';
import User from '../models/User.js';
import jwtHelper from '../middlewares/JwtHelper.js';

export default {
  onRegister: async (req, res) => {
    try {
      await Account.findAccount(req.body.email, async (err, data) => {
        if (err) {
          res.status(409).json({ message: `An error occured: ${err.message}`});
        }
        else if (data) {
          res.status(300).json({ message: `Email ${req.body.email} is already registered`});
        }
        else {
          var newAccount = new Account ({ 
            email: req.body.email,
            password: req.body.password
          });
          await newAccount.save(async err => {
            if (err) {
              res.status(500).json({ message: `An error occured: ${err.message}`});
            } else {
              var newUser = await User.createUser(req.body.email);
              res.status(200).json({ message: 'Successfully created new account', account: newAccount, user: newUser});
            }
          })
        }
      }) 
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },

  onLogin: async (req, res) => {
    try {
      await Account.findAccount(req.body.email, (err, account) => {
        if (err) {
          res.status(409).json({ message: `An error occured: ${err.message}`});
        }
        if (!account) {
          res.status(300).json({ message: `Email ${req.body.email} does not exist`});
        } else {
          account.comparePassword(req.body.password, async (err, isMatch) => {
            if (isMatch) {
              var tokenAccess = await jwtHelper.generateToken(account);
              res.status(200).json({ success: true, token: tokenAccess});
            } else {
              res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
          })
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },

  onLogout: async (req, res) => {
    try {
      return res.status(200).send({success: true, msg: 'Logout successfully'});
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  onGetAllAccounts: async (req, res) => {
    try {
      const accounts = await Account.getAllAccount();
      return res.status(200).json({ success: true, accounts });
    } catch (error) {
      
      return res.status(500).json({ success: false, error: error })
    }
  }

  // // '/v1/account/logout'
  // api.get('/logout', authenticate, (req, res) => {
  //   res.logout();
  //   res.status(200).send('Successfully logged out');
  // });

  // api.get('/me', authenticate, (req, res) => {
  //   res.status(200).json(req.user);
  // });

  // return api;
}
