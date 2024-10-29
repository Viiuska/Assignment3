const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({
  override: true,
  path: path.join(__dirname, "dev.env"),
});

const { Client } = require("pg");

const app = express();
app.use(express.static(path.join(__dirname, "frontend")));
app.use(cors());
app.use(express.json());

app.get("/api/nailpolishes", async (req, res) => {
  const city = req.query.city;
  const client = new Client({
    user: process.env.USER, // Replace your own pgAdmin information, example: user:"postgres"
    host: process.env.SERVER, // Replace your own pgAdmin information, example: host:"localhost"
    database: req.query.city,
    password: process.env.PASSWORD, // Replace your own pgAdmin information
    port: process.env.POST, // Replace your own pgAdmin information
  });

  client
    .connect()
    .then(() => console.log("connected"))
    .catch((err) => console.log(err.message));

  try {
    const exclusive = client.query("SELECT * FROM exclusivenailpolish");
    const gel = client.query("SELECT * FROM gelnailpolish");
    const regular = client.query("SELECT * FROM regularnailpolish");
    const transparent = client.query("SELECT * FROM transparentnailpolish");

    const [exclusiveResult, gelResult, regularResult, transparentResult] =
      await Promise.all([exclusive, gel, regular, transparent]);

    res.json({
      exclusivenailpolish: exclusiveResult.rows,
      gelnailpolish: gelResult.rows,
      regularnailpolish: regularResult.rows,
      transparentnailpolish: transparentResult.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
