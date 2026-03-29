import express from "express";
import { responseTime } from "./middlewares/response_time.js";

const app = express();

app.use(responseTime);

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
