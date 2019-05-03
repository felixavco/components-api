const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const { PORT, MONGO_URI } = require('./config/keys');
const app = express();

app.use(cors());

//** BodyParser Middleware **/
//* parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//* parse application/json
app.use(express.json());

//* Passport Middleware
app.use(passport.initialize());

//* Importing API routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

//* Defining API routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.get('/api/admin', (req, res) => res.send("<h3>Admin Route</h3>"));
app.use('/', (req, res) => res.send('Welcome to my test API'));

//* Set Errors object to collect errors
app.use((req, res, next) => {
	req.errors = {};
	next();
});

app.use('/public', express.static(path.join(__dirname, 'public')));

//* DB Connection and Server initialization
mongoose
	.connect(MONGO_URI, { useNewUrlParser: true })
	.then(() => {
		console.log('Connected to DB');
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((error) => console.error(error));
