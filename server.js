const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/StudentModel");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

app.get("/blog", (req, res) => {
  res.send("Hello Blog");
});
//Fetch all the student details
app.get("/studentDetails", async (req, res) => {
  try {
    const student = await Student.find({});
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Fetch a single student by Id
app.get("/studentDetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Update
app.put("/studentDetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body);
    // we cannot find any product in database
    if (!student) {
      return res
        .status(404)
        .json({ message: `cannot find any student with ID ${id}` });
    }
    const updatedStudent = await Student.findById(id);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Delete
app.delete("/studentDetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res
        .status(404)
        .json({ message: `cannot find any student with ID ${id}` });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Create
app.post("/studentDetails", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
