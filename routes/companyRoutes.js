const {Router} = require('express');
const {getJob, addJob, updateJob, deleteJob, dashboard, create_job_get, edit_job_get, view_job_details, view_applications, view_application_details} = require('../controllers/CompanyController');

const router = Router();

router.get('/company/jobs', getJob);
router.post('/company/job/create', addJob);
router.put('/company/job/update/:id', updateJob);
router.post('/company/job/delete/:id', deleteJob);
router.get('/company/dashboard', dashboard);
router.get('/company/job/create', create_job_get);
router.get('/company/job/update/:id', edit_job_get);
router.get('/company/job/show/:id', view_job_details);
router.get('/company/applications', view_applications);
router.get('/company/applications/:id', view_application_details);

module.exports = router;
