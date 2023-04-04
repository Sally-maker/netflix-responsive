const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const authRoute = require("./routes/auth");
const UserRoute = require("./routes/users");
const MovieRoute = require("./routes/movies");
const ListRoute = require("./routes/list");



require("../src/database/mongo");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", UserRoute);
app.use("/api/movies", MovieRoute);
app.use("/api/lists", ListRoute);


app.listen(8800, () => {
  console.log("Backend server is running!");
});