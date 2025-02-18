import express, { Express, Response } from "express";
import trialRoutes from "./trials/trials.routes";

const app: Express = express();
const port = 8080;

app.use('/api/trials', trialRoutes);

app.get("/ping", (_req, res: Response) => {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;