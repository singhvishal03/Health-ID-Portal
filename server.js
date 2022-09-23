const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/doctor/profile', require('./routes/api/doctorprofile'));
app.use('/api/doctorauth', require('./routes/api/doctorauth'));
app.use('api/doctor/profile', require('./routes/api/doctorauth'));
app.use('/api/registeradmin', require('./routes/api/registeradmin'));
app.use('/api/adminauth', require('./routes/api/adminauth'));

const PORT = process.env.PORT || 5000; //if no port present then navigate to port 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
