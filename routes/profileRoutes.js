const {Router} = require('express');
const router = Router();
const {upload, view_profile, edit_profile_form, edit_profile} = require('../controllers/ProfileController');

router.get('/profile', view_profile);
router.get('/profile/:id/edit', edit_profile_form);
router.put('/profile/:id/edit', upload, edit_profile);

module.exports= router;