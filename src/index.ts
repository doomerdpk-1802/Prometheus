import express from "express";
import { responseTime } from "./middlewares/response_time.js";
import { metricsMiddleware } from "./middlewares/metrics.js";
import client from "prom-client";

const app = express();

// app.use(responseTime);
app.use(metricsMiddleware);

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

app.get("/delay", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.send("2 sec delay!");
});

app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});

app.listen(3000, () => {
  console.log("Application is running on port 3000");
});
