import express, { Request, Response, NextFunction } from "express";

const app = express();
const port = 3000;

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const body = req.query;
  console.log(body);
  res.json(body);
});

app.use(router);

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
