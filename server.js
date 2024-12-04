const express = require('express');
const app = express();
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middlewares/authMiddleware');

require('dotenv').config();

connectDb();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get('*', checkUser);
app.use(authRoutes);
app.use(companyRoutes);
app.use(userRoutes);
app.use(profileRoutes);

app.listen(process.env.PORT, () => {
    console.log('Hire now is running on port 3000');
});