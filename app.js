const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require("config");
const PORT = config.get("port") || 5000;
const path = require("path");
app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
}
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(5000, () =>
      console.log(`приложение запущено на порту: ${PORT}`)
    );
  } catch (e) {
    console.log("Сервер упал ", e.message);
    process.exit(1);
  }
}

start();
