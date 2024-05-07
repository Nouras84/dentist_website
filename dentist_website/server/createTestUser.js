// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const User = require("./models/user"); // Make sure the path to your User model is correct

// // Connect to your database
// // Ensure to replace 'yourDatabaseName' with the actual name of your database
// mongoose
//   .connect("mongodb://localhost:27017/yourDatabaseName", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// async function createTestUser() {
//   try {
//     const hashedPassword = bcrypt.hashSync("mairaira.1984", 12);

//     const testUser = new User({
//       username: "testUser",
//       password: hashedPassword,
//     });

//     await testUser.save();
//     console.log("Test user created successfully");
//   } catch (error) {
//     console.error("Error creating test user:", error);
//   } finally {
//     mongoose.disconnect();
//   }
// }

// createTestUser();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user"); // Make sure the path to your User model is correct

// Connect to your database
mongoose
  .connect("mongodb://localhost:27017/dentist_website")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function createTestUser() {
  try {
    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username: "mousa" });
    if (existingUser) {
      console.log("User already exists");
      return; // Exit the function if user exists
    }

    // If the user doesn't exist, create a new one
    // const hashedPassword = bcrypt.hashSync("Nour4s", 12);

    const testUser = new User({
      username: "mousa",
      //   password: hashedPassword
      password: "Nour4as",
    });

    await testUser.save();
    console.log("Test user created successfully");
  } catch (error) {
    console.error("Error creating test user:", error);
  } finally {
    // Uncomment the next line if you're sure the script runs synchronously
    // mongoose.disconnect();
  }
}

createTestUser();
