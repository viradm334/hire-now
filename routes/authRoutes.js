const {Router} = require('express');
const { login_post, login_get, register_post, register_get, home, smoothies, logout_get } = require('../controllers/AuthController');
const {requireAuth } = require('../middlewares/authMiddleware');

const router = Router();

router.get('/register', register_get);
router.post('/register', register_post);
router.get('/login', login_get);
router.post('/login', login_post);
router.get('/', home);
router.get('/smoothies', requireAuth, smoothies);
router.get('/logout', logout_get);

module.exports = router;