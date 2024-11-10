const mongoose = require("mongoose");

const connectToDb = () => {
  return mongoose.connect(
    "mongodb+srv://hamzanaseer496:hamza@cluster0.fvro8.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = { connectToDb };
