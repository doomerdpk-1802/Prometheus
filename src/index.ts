import express from "express";

const app = express();

app.get("/greet", (req, res) => {
  res.send("Hello Deepak!");
});

app.get("/details", (req, res) => {
  res.status(200).json({
    name: "Deepak",
    age: 25,
    DOB: "19/11/2000",
  });
});

app.listen(3000, () => {
  console.log("Application is running on port 3000");
});
