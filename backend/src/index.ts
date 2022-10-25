import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import policiesRoute from "./routes/policies";

const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.use(policiesRoute);

app.get("/", (req, res) => {
  res.send("Server is up and running 🚀");
});

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
