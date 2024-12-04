const multer = require('multer');

const updateUser = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user){
            return res.status(404).json({message: `User not found`});
        };
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `User not found`});
        };
        res.status(200).json({message: 'User deleted succesfully'});
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getUsers = async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getUserById = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), async(req, res) => {
    res.send('File uploaded succesfully!');
}); */