import mongoose from "mongoose";
import "dotenv/config";

const options = {
  dbName: "Alterian",
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  maxPoolSize: 15,
};

mongoose
  .connect(
    process.env.MONGO_URI || `mongodb://localhost/${options.dbName}`,
    options
  )
  .then(() =>
    console.log(`Database: ${options.dbName} connected successfully!`)
  )
  .catch((err) => console.log(err));

mongoose.connection.on("connected", () =>
  console.log("Connection Established")
);

mongoose.connection.on("error", (err) => console.log(err.message));

mongoose.connection.on("disconnected", () => console.log("Disconnected"));

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
