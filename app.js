const express = require("express");
const app = express();
const db = require("./models/index");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

const userRoute = require("./routes/users");

app.use("/api", userRoute);

db.sequelize
  .sync()
  .then(() => {
    console.log("Db is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
