import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

import * as recommController from "./controllers/recommController";

app.post("/recommendations", recommController.newVideo);
app.post("/recommendations/:id/upvote", recommController.like);
app.post("/recommendations/:id/upvote", recommController.dislike);

export default app;
