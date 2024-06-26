const express = require('express')
const connectDB = require('./config/db');
const app = express()
const cors = require('cors')
require('dotenv').config()

// Connect to MongoDB
connectDB();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const { router } = require('./routers');
app.use("/api/users", router);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
