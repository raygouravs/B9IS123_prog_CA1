/*
  Reference: Lines 14-19: express-session setup code is available at NPM express-session documentation at: https://www.npmjs.com/package/express-session
*/

const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'express-session-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60 }
}));

app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

// register routes for zones
const zonesRoutes = require('./routes/zonesRoutes');
app.use('/api/zones', zonesRoutes);

// register routes for desks
const desksRoutes = require('./routes/deskRoutes');
app.use('/api/desks', desksRoutes);

// register routes for members
const membersRoutes = require('./routes/membersRoutes');
app.use('/api/members', membersRoutes);

// register routes for bookings
const bookingsRoutes = require('./routes/memberBookingsRoutes');
app.use('/api/bookings', bookingsRoutes);

// register routes for checkins
const checkinRoutes = require('./routes/checkinRoutes');
app.use('/api/checkins', checkinRoutes);

// register routes for admin-system-reset
const systemRoutes = require('./routes/adminSystemRoutes');
app.use('/api/adminsystem', systemRoutes);

// register routes for admin-dashboard
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');
app.use('/api/dashboard', adminDashboardRoutes);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

//MARK: Initialize the database and create tables if they don't exist
require('./setupDB');








