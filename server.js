const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

app.get("/blog", (req, res) => {
  res.send("Hello Blog");
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:Manvi@studentdetailsapi.cqvx8bi.mongodb.net/StudentDetailsAPI"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
