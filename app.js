const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { notFoundHandler } = require("./utils/notFoundHandler");
const { errorHandler } = require("./utils/errorHandler");
const userRoutes = require("./routes/v1/users.routes");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

const server = app.listen(port, () => {
  `App is listening on port ${port}.`;
});

app.use(notFoundHandler);
app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  server.close((error) => {
    process.exit(error ? 1 : 0);
  });
});
