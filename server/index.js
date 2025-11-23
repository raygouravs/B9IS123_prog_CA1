const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

const zonesRoutes = require('./routes/zonesRoutes');
app.use('/api/zones', zonesRoutes);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

//MARK: Initialize the database and create tables if they don't exist
require('./setupDB');




