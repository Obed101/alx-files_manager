import express from 'express';
import res from 'express/lib/response';

import AppController from '../controllers/AppController.js';
//import UsersController from '../controllers/UsersController';
//import AuthController from '../controllers/AuthController';

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.get('/', (_, res) => {res.send('This Is the home Page')})

//router.post('/users', UsersController.postNew);
//router.get('/users/me', UsersController.getMe);

//router.get('/connect', AuthController.getConnect);
//router.get('/disconnect', AuthController.getDisconnect);

export default router;
