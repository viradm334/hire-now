const {Router} = require('express');
const {getJob, addJob, updateJob, deleteJob, dashboard} = require('../controllers/CompanyController');

const router = Router();

router.get('/company/jobs', getJob);
router.post('/company/job/create', addJob);
router.put('/company/job/update/:id', updateJob);
router.post('/company/job/delete/:id', deleteJob);
router.get('/company/dashboard', dashboard);

module.exports = router;
