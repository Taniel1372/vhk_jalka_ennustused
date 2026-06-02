const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "Jalka.html")
  );
});

app.get("/predictions", (req, res) => {
  const raw = fs.readFileSync("predictions.json", "utf8");
  res.json(JSON.parse(raw));
});

app.post("/save-bracket", (req, res) => {

  const bracket = req.body.bracket;
  const name = req.body.name;

  // Read existing predictions
  const raw = fs.readFileSync(
    "predictions.json",
    "utf8"
  );

  const predictions = JSON.parse(raw);

  // Add new prediction
  predictions.push({
    name: name,
    bracket: bracket,
    submittedAt: new Date()
  });

  // Save updated array
  fs.writeFileSync(
    "predictions.json",
    JSON.stringify(predictions, null, 2)
  );

  console.log("Prediction saved!");

  res.json({
    message: "Saved successfully"
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
