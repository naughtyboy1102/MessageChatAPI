import express from 'express';
// controllers
import AccountController from '../controllers/AccountController.js';
import passport from 'passport';

const router = express.Router();

router
  .get('/all', passport.authenticate('jwt', { session: false}), AccountController.onGetAllAccounts)
  .post('/register', AccountController.onRegister)
  .post('/login', AccountController.onLogin)
  .get('/logout', AccountController.onLogout)

export default router;