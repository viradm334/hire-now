const {Router} = require('express');
const {getJob, addJob, updateJob, deleteJob, dashboard, create_job_get, edit_job_get, view_job_details, view_applications, view_application_details, get_profile, edit_profile_get, edit_profile_put} = require('../controllers/CompanyController');

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
router.get('/company/profile', get_profile);
router.get('/company/profile/edit', edit_profile_get);
router.put('/company/profile/edit', edit_profile_put);

module.exports = router;
