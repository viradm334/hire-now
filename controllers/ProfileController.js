const User = require('../models/User');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'resume') {
            cb(null, 'uploads/resume'); 
          } else if (file.fieldname === 'profilePhoto') {
            cb(null, 'uploads/profile_photo');
          } else if(file.fieldname === 'companyIcon'){
          cb(null, 'uploads/company_icons');
        }else {
            cb(new Error('Invalid file field'), false);
          }
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/\s+/g, '-');
        cb(null, `${name}-${Date.now()}${ext}`);
    }
  });
  
const upload = multer({ storage: storage }).fields([
    { name: 'resume', maxCount: 1 }, 
    { name: 'profilePhoto', maxCount: 1 } 
  ]);

const view_profile = async(req, res) => {
    try{
        const user = res.locals.user;
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err.message);
    }
};

const edit_profile_form = async(req, res) => {
    try{
        res.render('profile/edit');
    }catch(err){
        res.status(500).json({message: "Failed to get profile update form!"});
    }
};

const edit_profile = async(req, res) => {
    try{
        const {id} = req.params;
        const updateData = {...req.body};

        if(req.files['resume']){
            updateData['resume'] = {
                filename: req.files['resume'][0].filename,
                url: `uploads/resume/${req.files['resume'][0].filename}`
            }
        };

        if(req.files['profilePhoto']){
            updateData['profilePhoto'] = {
                filename: req.files['profilePhoto'][0].filename,
                url: `uploads/profile_photo/${req.files['profilePhoto'][0].filename}`
            }
        };

        const user = await User.findByIdAndUpdate(id, updateData);

        if(!user){
            return res.status(404).json({message: "User not found!"});
        };
        res.status(200).json({message: "Successfully updated profile data!", user});
    }catch(err){
        res.status(500).json({message: "Successfully updated profile data!"});
    }
};

module.exports = {upload, view_profile, edit_profile_form, edit_profile};