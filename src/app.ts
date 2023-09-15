import"express-async-errors";

import express from "express";
import cors  from "cors";
import { routes } from "./main/routes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

app.use(express.json());

app.use(routes);
export { app };