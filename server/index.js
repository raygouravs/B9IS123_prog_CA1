const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

//MARK: Initialize the database and create tables if they don't exist
require('./setupDB');




