const router = require('express').Router();

const { getCurrentUser, updateProfile } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUserUpdateBody } = require('../middlewares/validation');

router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, validateUserUpdateBody, updateProfile);

module.exports = router;