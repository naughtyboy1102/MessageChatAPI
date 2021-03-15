import express from 'express';
// controllers
import UserController from '../controllers/UserController.js';
import passport from 'passport';

const router = express.Router();

router
  .get('/', UserController.onGetAllUsers)
  .put('/update', passport.authenticate('jwt', {session: false}), UserController.onUpdateUser)
  .get('/:email', UserController.onGetUserByEmail)
  // .delete('/:id', user.onDeleteUserById)

export default router;