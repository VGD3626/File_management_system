const express = require("express");
const { connectToDb } = require("./dbConnection");
const fileRouter = require("./routes/fileRouter");
const userRouter = require("./routes/userRouter");
// const folderRouter = require("./routes/folderRouter");
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/users",userRouter);
app.use("/files", fileRouter);
// app.use("/folders", folderRouter);
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error');
});


connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
