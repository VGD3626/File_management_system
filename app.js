const express = require("express");
const { connectToDb } = require("./dbConnection");
const fileRouter = require("./routes/fileRouter");
// const folderRouter = require("./routes/folderRouter");
const dotenv = require('dotenv');
dotenv.config();
// const { createUser, getUsers } = require("./userController");

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());

app.use("/files", fileRouter);
// app.use("/folders", folderRouter);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error');
});


// Connect to MongoDB
connectToDb()
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
