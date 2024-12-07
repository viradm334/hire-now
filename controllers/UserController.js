const User = require('../models/User');
const Job = require("../models/Job");
const Bookmark = require('../models/Bookmark');
const Application = require('../models/Application');

const job_board = async(req, res) => {
    try{
        const page = parseInt(req.query.page) -1 || 0;
        const limit = parseint(req.query.limit) || 10;
        const search = req.query.search || '';
        let job_function = req.query.job_function || 'all';
        let job_level = req.query.job_level || 'all';
        let employment_type = req.query.employment_type || 'all';
        const user = res.locals.user;
        const jobs = await Job.aggregate([
            {
              $lookup: {
                from: "bookmarks", // Name of the bookmarks collection
                localField: "_id", // Field in the Job model
                foreignField: "job_id", // Field in the Bookmark model
                as: "bookmarks", // Alias for the joined data
              },
            },
            {
              $addFields: {
                isBookmarked: user ? { // Check if user is logged in and if the job is bookmarked
                  $in: [user._id, "$bookmarks.user_id"],
                } : false, // If user is not logged in, set isBookmarked to false
              },
            },
            {
              $project: {
                title: 1,
                user_id: 1,
                isBookmarked: 1, // Include the bookmark status in the result
              },
            },
          ]);
        res.status(200).json({jobs, user});
    } catch(err){
        res.status(500).json({message: "Problem fetching jobs"});
    }
};

const job_details = async(req, res) => {
    try{
        const {id} = req.params;
        const job = await Job.findById(id);
        res.status(200).json(job);
    }catch(err){
        res.status(500).json({message: "Problem fetching job detail!"});
    }
};

const view_my_applications = async(req, res) => {
    try{
        const user = res.locals.user;
        const applications = await Application.find({ user_id: user.id })
        .populate({
            path: 'job_id',
            populate: {
            path: 'user_id',
            model: 'User',
            },
        });

        if(!applications){
            return res.status(404).json(applications);
        }
        res.render('my-applications', {title: 'My Applications', applications});
        // res.status(200).json(applications);
    } catch(err){
        res.status(500).json({message: "Problem fetching your applications!"});
    }
};

const apply_to_job = async(req, res) => {
    const {user_id, job_id} = req.body;
    try{
        const application = await Application.create({user_id, job_id});
        res.status(200).json({message: "Successfully applied to job!"});
    }catch(err){
        res.status(500).json({message: "Failed to apply to job!"});
    }
};

const view_my_bookmarks = async(req, res) => {
    try{
        const user = res.locals.user;
        const bookmarks = await Bookmark.find({user_id: user.id}).populate({
            path: 'job_id',
            populate: {
            path: 'user_id',
            model: 'User',
            },
        });
        // res.status(200).json(bookmarks);
        res.render('bookmarks', {title: 'Bookmarks', bookmarks});
    }catch(err){
        res.status(500).json(err.message);
    }
};

const create_bookmark = async(req, res) => {
    const {user_id, job_id} = req.body;
    try{
        const bookmark = await Bookmark.create({
            user_id: user_id,
            job_id: job_id
        });
        res.status(200).json({status: 'success', message: "Job saved to bookmark!"});
    } catch(err){
        res.status(500).json({message: "Failed to save bookmark!"});
    }
};

const filter_job = async(req, res) => {
    const {job_level, employment_type, job_function, education} = req.query;
    console.log(job_level);
    console.log(employment_type);
};

const delete_bookmark = async(req, res) => {
    try{
        const {id} = req.params;
        const deleteBookmark = await Bookmark.deleteOne({_id: id});
        res.status(200).json({message: 'Job succesfully removed from bookmarks!', status: 'success'});
    }catch(err){
        res.status(500).json({message: "Failed to delete bookmark!"});
    }
}

module.exports = {job_board, job_details, view_my_applications, apply_to_job, view_my_bookmarks, create_bookmark, delete_bookmark};
