const Application = require("../models/Application");
const {Job, EmploymentTypeEnum, jobFunctionEnum, jobLevelEnum, educationEnum} = require("../models/Job");
const {User, industryEnum, companySizeEnum} = require('../models/User');

const getJob = async (req, res) => {
  try {
    const user = res.locals.user;
    const jobs = await Job.find({ user_id: user.id, isDeleted: false });
    res.render('company/jobs/index', {jobs, title: 'Jobs List'});
  } catch (err) {
    res.status(404).json({ message: "Job not found!" });
  }
};

const addJob = async (req, res) => {
  const {
    title,
    user_id,
    job_level,
    location,
    employment_type,
    salary,
    education,
    job_desc,
    vacancy,
    job_function,
    available,
  } = req.body;
  try {
    const castedSalary = Number(salary);
    const castedVacancy = Number(vacancy);
    const castedAvailable = available === 'true'; 

    if (isNaN(castedSalary) || isNaN(castedVacancy)) {
      return res.status(400).json({ status: 'error', message: 'Invalid salary or vacancy value' });
    }

    const job = await Job.create({
      title,
      user_id,
      job_level,
      location,
      employment_type,
      salary: castedSalary,
      education,
      job_desc,
      vacancy: castedVacancy,
      job_function,
      available: castedAvailable,
    });
    res.status(200).json({ status: 'success', message: "Job successfully created!" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateJob = async (req, res) => {
  try {
    const {id} = req.params;
    const {
      title,
      user_id,
      job_level,
      location,
      employment_type,
      salary,
      education,
      job_desc,
      vacancy,
      job_function,
      available,
    } = req.body;

    const castedSalary = Number(salary);
    const castedVacancy = Number(vacancy);
    const castedAvailable = available === 'true'; 

    if (isNaN(castedSalary) || isNaN(castedVacancy)) {
      return res.status(400).json({ status: 'error', message: 'Invalid salary or vacancy value' });
    };

    const job = await Job.findByIdAndUpdate(id, {title,
      user_id,
      job_level,
      location,
      employment_type,
      salary: castedSalary,
      education,
      job_desc,
      vacancy: castedVacancy,
      job_function,
      available: castedAvailable});

    if(!job){
        return res.status(404).json({message: "Job not found!"});
    };
    res.status(200).json({status: 'success', message: "Successfully updated job data!"});
  } catch (err) {
    res.status(500).json({ message: "Failed to update job!" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const {id} = req.params;
    const job = await Job.findByIdAndUpdate(id, { isDeleted: true });
    if(!job){
        return res.status(404).json({message: "Job not found!"});
    }
    res.redirect('/company/jobs');
  } catch (err) {
    res.status(500).json({ message: "Failed to delete job!" });
  }
};

const view_applications = async(req, res) => {
  try{
    const user = res.locals.user;
    const jobs = await Job.find({ user_id: user.id });
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({ job_id: { $in: jobIds } })
    .populate('user_id')
    .populate('job_id');
    res.render('company/applications/index', {applications, title: 'Applications list'});
  }catch(err){
    res.status(500).json({message: "Failed to get job applications!"});
  }
};

const view_application_details = async(req, res) => {
  try{
    const {id} = req.params;
    const application = await Application.findByIdAndUpdate(
      id,
      { status: 'reviewed' },
      { new: true }
    )
      .populate('user_id')
      .populate('job_id');

    if(!application){
      return res.status(404).json({message: 'Application not found!'});
    };
    res.render('company/applications/show', {application, title: 'Review Job Application'});
  } catch(err){
    res.status(500).json({message: "Failed to get job application details!"});
  }
};

const dashboard = async(req, res) => {
   try{
    const user = res.locals.user;
    const job_count = await Job.countDocuments({user_id: user.id, isDeleted: false});
    const companyJobs = await Job.find({user_id: user.id});
    const jobIds = companyJobs.map(job => job._id);

    const applicationCount = await Application.countDocuments({ job_id: { $in: jobIds }, status: 'pending' });
    res.render('company/dashboard', {title: 'Dashboard', jobCount: job_count, appCount: applicationCount});
   } catch(err){
    res.status(500).json({message: "Failed to fetch dashboard!"});
   }
};

const create_job_get = async(req, res) => {
  try{
    const user = res.locals.user;
    const employmentTypes = Object.values(EmploymentTypeEnum);
    const jobFunctions = Object.values(jobFunctionEnum);
    const jobLevels = Object.values(jobLevelEnum);
    const educations = Object.values(educationEnum);
    const booleanOptions = [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ];
    res.render('company/jobs/create', {title: 'Create New Job', user, employmentTypes, jobFunctions, jobLevels, educations, booleanOptions});
  }catch(err){
    res.status(500).json({message: "Something went wrong, try again!"});
  }
};

const edit_job_get = async(req, res) => {
  try{
    const {id} = req.params;
    const user = res.locals.user;
    const job = await Job.findById(id);
    const employmentTypes = Object.values(EmploymentTypeEnum);
    const jobFunctions = Object.values(jobFunctionEnum);
    const jobLevels = Object.values(jobLevelEnum);
    const educations = Object.values(educationEnum);
    const booleanOptions = [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ];
    res.render('company/jobs/update', {title: 'Update Job', user, employmentTypes, jobFunctions, jobLevels, educations, booleanOptions, job});
  }catch(err){
    res.status(500).json({message: 'Something went wrong, try again!'});
  }
};

const view_job_details = async(req, res) => {
  try{
    const user = res.locals.user;
    const {id} = req.params;
    const job = await Job.findById(id);
    const employmentTypes = Object.values(EmploymentTypeEnum);
    const jobFunctions = Object.values(jobFunctionEnum);
    const jobLevels = Object.values(jobLevelEnum);
    const educations = Object.values(educationEnum);
    const booleanOptions = [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ];
    res.render('company/jobs/show', {title: 'View job details', user, employmentTypes, jobFunctions, jobLevels, educations, booleanOptions, job});
  }catch(err){
    res.status(500).json({message: 'Something wrong happened!'});
  }
};

const get_profile = async(req, res) => {
  try{
    const user = res.locals.user;
    res.render('company/profile/index', {user, title: 'Profile'});
  }catch(err){
    res.status(500).json({message: 'Something wrong happened!'});
  }
};

const edit_profile_get = async(req, res) => {
  try{
    const user = res.locals.user;
    const industries = Object.values(industryEnum);
    const companySize = companySizeEnum;
    res.render('company/profile/edit', {user, title: "Edit Profile", industries, companySize});
  }catch(err){
    res.status(500).json({message: 'Something wrong happened!'});
  }
};

const edit_profile_put = async(req, res) => {
  try{
    const user = res.locals.user;
    const {
      name,
      email,
      industry,
      company_size,
      about,
      primary_location
    } = req.body;
    const updatedUser = await User.findByIdAndUpdate(user.id, {
      name,
      email,
      industry,
      company_size,
      about,
      primary_location
    });
    res.status(200).json({status: 'success', message: 'Sucessfully updated profile!'});
  }catch(err){
    res.status(500).json({message: 'Something wrong happened!'});
  }
};

module.exports = {getJob, addJob, updateJob, deleteJob, view_applications, view_application_details, dashboard, create_job_get, edit_job_get, view_job_details, get_profile, edit_profile_get, edit_profile_put};
