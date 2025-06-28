import express from "express";
import { routes } from "./routes";
import { ErrorHandler } from "./middlewares/error-handler.middleware";
import { PageNotFoundMiddleware } from "./middlewares/page-not-found.middleware";

const app = express()
routes(app)
PageNotFoundMiddleware.PageNotFound(app)
ErrorHandler.handler(app)

export default app