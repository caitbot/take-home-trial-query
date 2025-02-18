import express, { Express, Response } from "express";
import trialRoutes from "./trials/trials.routes";

const app: Express = express();

app.use('/api/trials', trialRoutes);

app.get("/ping", (_req, res: Response) => {
  res.send("pong");
});

export default app;