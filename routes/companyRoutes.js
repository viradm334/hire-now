const {Router} = require('express');
const {getJob, addJob, updateJob, deleteJob, dashboard, create_job_get, edit_job_get} = require('../controllers/CompanyController');

const router = Router();

router.get('/company/jobs', getJob);
router.post('/company/job/create', addJob);
router.put('/company/job/update/:id', updateJob);
router.post('/company/job/delete/:id', deleteJob);
router.get('/company/dashboard', dashboard);
router.get('/company/job/create', create_job_get);
router.get('/company/job/update/:id', edit_job_get);

module.exports = router;
