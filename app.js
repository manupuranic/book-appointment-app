const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRouter = require("./routes/users");
const sequelize = require("./utils/database");

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(cors());

app.use("/users", userRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "404" });
});

sequelize
  .sync()
  .then(() => {
    app.listen(4000, console.log("Server running at port: 4000"));
  })
  .catch((err) => console.log(err));
