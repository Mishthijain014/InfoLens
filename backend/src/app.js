const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const contentRoutes = require("./routes/content.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Content Intelligence Platform API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

module.exports = app;