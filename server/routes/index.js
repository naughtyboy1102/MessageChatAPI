import express from 'express';
// controllers
import users from '../controllers/UserController.js';
// middlewares
//import { encode } from '../middlewares/jwtHelper.js';

const router = express.Router();

router
  .get('/', (req, res) => {
    res.send("Hello");
  })
  //.post('/login/:userId', encode, (req, res, next) => { });

export default router;