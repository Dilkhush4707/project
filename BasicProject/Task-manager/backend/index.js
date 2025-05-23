import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Connect from "./config/db.js";
import { router } from "./routes/taskRoute.js";
import bodyparser from "body-parser";
dotenv.config();
Connect();
const app = express();
app.use(cors());
app.use(bodyparser.json());
const PORT = process.env.PORT;
app.use("/tasks", router);

app.listen(PORT, () => {
  console.log(`server listen at ${PORT}`);
});
