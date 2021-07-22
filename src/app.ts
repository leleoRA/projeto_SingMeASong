import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

import * as recommController from "./controllers/recommController";

app.get("/recommendations", recommController.newVideo);

export default app;
