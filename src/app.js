"use strict";

//dependencies
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const PATH = require("path");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

//routers
const taApplicationRouter = require("./routes/ta-application-route.js");

//instantiation
const app = express();
const swagger_path = PATH.resolve(__dirname, "./documents/swagger_doc.yml");
const swaggerJsDocs = YAML.load(swagger_path);

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.status(200).json({ Message: "Hello" });
  app.get("/health", (req, res) => {
    res.status(200).json({ health: "OK" });
  });
});
app.use(
  "/api-docs",
  swaggerUI.serveWithOptions({ redirect: false }),
  swaggerUI.setup(swaggerJsDocs)
);
app.use("/api/ta_application", taApplicationRouter);

//exports
module.exports = { app };
