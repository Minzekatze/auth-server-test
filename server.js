import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import authRoute from "./routes/authRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 3400;
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", authRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Your app listening on port ${port}`);
});
