// common.js
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
const router = express.Router();
const app = express();
import bodyParser = require("body-parser");
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swag.json"; // Đường dẫn tới tệp swagger.json

dotenv.config();

const secretKey: Secret = process.env.SECRET_KEY || "";
const port = process.env.PORT || 3000;

const specs = swaggerJsdoc(swaggerDocument);
const swagSetup = swaggerUi.setup(specs);
const swagServe = swaggerUi.serve;

const db: any = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_DATABASE,
};

export {
  jwt,
  secretKey,
  express,
  multer,
  router,
  app,
  bodyParser,
  port,
  db,
  swagSetup,
  swagServe,
};
