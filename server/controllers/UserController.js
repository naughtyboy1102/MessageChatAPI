// utils
import makeValidation from '@withvoid/make-validation';
// models
import User from '../models/User.js';

export default {
    onGetAllUsers: async (req, res) => { },
    onGetUserByEmail: async (req, res) => { 
      try {
        await User.getUserByEmail(req.params.email, (err, user) => {
          if (err) {
            res.status(409).json({ message: `An error occured: ${err.message}`});
          } if (user) {
            res.status(200).json({ message: 'Successfully got user', user: user});
          } else {
            res.status(300).json({ message: `Email ${req.params.email} does not exist`});
          }
        })
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
    },
    onUpdateUser: async (req, res) => {
      try {
          await User.updateUser(req.body.email, req.body.name, req.body.avatar, (err, user) => {
            if (err) {
              res.status(409).json({ message: `An error occured: ${err.message}`});
            } else {
              res.status(200).json({ message: 'Successfully updated user', newUser: user});
            }
          });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
    }
  }


  /* validation input
    onCreateUser: async (req, res) => { 
      try {
        const validation = makeValidation(types => ({
          payload: req.body,
          checks: {
            firstName: { type: types.string },
            lastName: { type: types.string },
            //type: { type: types.enum, options: { enum: USER_TYPES } },
          }
        }));
        if (!validation.success) return res.status(400).json(validation);
  
        const { firstName, lastName, type } = req.body;
        const user = await UserModel.createUser(firstName, lastName, type);
        return res.status(200).json({ success: true, user });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
    }, */