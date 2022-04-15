import mysql from "mysql";
import config from "./config";

const param: mysql.ConnectionConfig = {
  user: config.MYSQL.MYSQL_USERNAME,
  password: config.MYSQL.MYSQL_PASSWORD,
  host: config.MYSQL.MYSQL_HOST,
  database: config.MYSQL.MYSQL_DATABASE,
};

export const Connect = async () => {
  return new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(param);

    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(connection);
    });
  });
};

export const Query = async (
  connection: mysql.Connection,
  query: mysql.QueryOptions
) => {
  return new Promise<Array<any>>((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(results);
    });
  });
};
