import dotenv from "dotenv";

dotenv.config();

interface Mysql {
  MYSQL_HOST: string;
  MYSQL_DATABASE: string;
  MYSQL_USERNAME: string;
  MYSQL_PASSWORD: string;
}

interface Env {
  NODE_ENV: string;
  PORT: number;
  SECRET: string;
  MYSQL: Mysql;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  SECRET: string;
  MYSQL: Mysql;
}

const getConfig = (): Config => {
  const _config: Env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    SECRET: process.env.SECRET,
    MYSQL: {
      MYSQL_HOST: process.env.MYSQL_HOST,
      MYSQL_DATABASE: process.env.MYSQL_DATABASE,
      MYSQL_USERNAME: process.env.MYSQL_USERNAME,
      MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    },
  };

  Object.keys(_config).forEach((key) => {
    if (_config[key] === undefined) throw new Error(`${key}沒有設定`);
  });

  return _config;
};

const config = getConfig();

export default config;
