import mysql from "mysql2";
import { db } from "utils"; // Assuming you have a file 'common.ts' where db configuration is defined

const connection: any = mysql.createConnection({
  host: db.host,
  port: db.port, // Make sure db.port is defined in common.ts
  user: db.user,
  password: db.password,
  database: db.name,
});

connection.connect((err: any) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

export { connection };
