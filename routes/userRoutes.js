const {Router} = require('express');
const router = Router();
const {job_board, job_details, view_my_applications, apply_to_job, view_my_bookmarks, create_bookmark} = require('../controllers/UserController');

router.get('/job-board', job_board);
router.get('/job/:id', job_details);
router.get('/my-applications', view_my_applications);
router.post('/apply', apply_to_job);
router.get('/bookmarks', view_my_bookmarks);
router.post('/bookmark/create', create_bookmark);

module.exports = router;