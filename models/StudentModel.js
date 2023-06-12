const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  StudentName: {
    type: String,
    required: [true, "Please enter your Name"],
  },

  StudentID: {
    type: String,
    required: true,
  },

  StudentEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: async (StudentEmail) => {
        const regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(StudentEmail);
      },
      message: "Invalid email address",
    },
  },

  StudentPhoneNumber: {
    type: Number,
    required: true,
    trim: true,
    validate: {
      validator: async (StudentPhoneNumber) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(StudentPhoneNumber);
      },
      message: "Invalid phone number",
    },
  },
  {
    timestamps:true
  }
});

const Student = mongoose.model('Student',StudentSchema);
module.exports = Student;