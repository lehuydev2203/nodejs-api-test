// src/index.js
import { app, bodyParser, port, swagServe, swagSetup } from "utils";
import { router } from "routes";

app.use("/api-doc", swagServe, swagSetup);
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});
app.use(bodyParser.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
