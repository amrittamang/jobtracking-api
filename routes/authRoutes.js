import express from 'express';
const router = express.Router();

import {
    register,
    login,
    logout,
    updateCurrentUser,
    getCurrentUser,
} from '../controllers/authController.js';
import authenticateUser from '../middleware/authenticateUser.js'

router.route('/register').post(register);
router.route('/login').post(login);
router.get('/logout', logout);

router.route('/updateCurrentUser').patch(authenticateUser, updateCurrentUser);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);

export default router;