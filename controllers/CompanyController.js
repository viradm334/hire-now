const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require('../models/User');

const getJob = async (req, res) => {
  try {
    const user = res.locals.user;
    const jobs = await Job.find({ user_id: user.id });
    res.status(200).json(jobs);
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
    const job = await Job.create({
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
    });
    res.status(200).json({ message: "Job successfully created!" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateJob = async (req, res) => {
  try {
    const {id} = req.params;
    const job = await Job.findByIdAndUpdate(id, req.body);
    if(!job){
        return res.status(404).json({message: "Job not found!"});
    }
    res.status(200).json({message: "Successfully updated job data!"});
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
    res.status(200).json({message: "Successfully removed job!"});
  } catch (err) {
    res.status(500).json({ message: "Failed to delete job!" });
  }
};

const view_applications = async(req, res) => {
  try{
    const {id} = req.body;
    const applications = await Application.find({job_id: id});
    res.status(200).json(applications);
  }catch(err){
    res.status(500).json({message: "Failed to get job applications!"});
  }
};

const view_application_details = async(req, res) => {
  try{
    const {id} = req.body;
    const application = await Application.findById(id);
    res.status(200).json({application, message: "success"});
  } catch(err){
    res.status(500).json({message: "Failed to get job application details!"});
  }
};

const dashboard = async(req, res) => {
   try{
    const user = res.locals.user;
    const job_count = await Job.countDocuments({user_id: user.id});
    const companyJobs = await Job.find({user_id: user.id});

    if (!companyJobs.length) {
      return 0;
    };
    const jobIds = companyJobs.map(job => job._id);

    const applicationCount = await Application.countDocuments({ job_id: { $in: jobIds }, status: 'pending' });
    res.render('company/dashboard', {title: 'Dashboard', jobCount: job_count, appCount: applicationCount});
   } catch(err){
    res.status(500).json({message: "Failed to fetch dashboard!"});
   }
};

module.exports = {getJob, addJob, updateJob, deleteJob, view_applications, view_application_details, dashboard};
