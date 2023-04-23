import { register, login, getUsers } from '../Controllers/User.controllers';
import express from 'express';
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getUsers);
router.post('/signup', register);
router.post('/login', login);

module.exports = router;