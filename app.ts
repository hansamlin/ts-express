import express, { Request, Response, NextFunction } from "express";
import config from "./config/config";
import { Connect, Query } from "./config/mysql";
import mysql from "mysql";
import Debug from "debug";

const debug = Debug("app");

const app = express();

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const body = req.query;
  console.log(body);
  console.log("here");
  res.json(body);
});

router.get("/hits/news/:id", async (req: Request, res: Response) => {
  try {
    const connection = await Connect();
    const query: mysql.QueryOptions = {
      sql: `SELECT id, hits FROM jsh_news WHERE id = ? and state = ?`,
      values: [req.params.id, 1],
    };

    const results = await Query(connection, query);

    connection.end();

    res.json(results[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

app.use(router);

const PORT = config.PORT;

app.listen(PORT, () => {
  debug(`Listen to ${PORT} port.`);
});
