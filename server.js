const express = require('express');
const connectDB = require('./utils/db');
const routes = require('./routes');

const app = express();

app.use(express.json());

connectDB();

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
