const {Router} = require('express');
const {getJob, addJob, updateJob, deleteJob, dashboard} = require('../controllers/CompanyController');

const router = Router();

router.get('/jobs/:id', getJob);
router.post('/job/create', addJob);
router.put('/job/update/:id', updateJob);
router.post('/job/delete/:id', deleteJob);
router.get('/dashboard', dashboard);

module.exports = router;
