import mysql from "mysql2";

const sqlConfig = {
  user: process.env.SQL_USERNAME || "root",
  password: process.env.SQL_PW || "root",
  port: Number(process.env.SQL_PORT) || 3306,
  host: process.env.SQL_HOST || "localhost",
  database: process.env.DATABASE || "todo",
};

// MySQL Connection
const db = mysql.createConnection({
  host: sqlConfig.host,
  port: sqlConfig.port,
  user: sqlConfig.user,
  password: sqlConfig.password,
  database: sqlConfig.database,
});

export default db;
