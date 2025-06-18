import express from "express";
import { routes } from "./routes";
import { ErrorHandler } from "./middlewares/error-handler.middleware";

const app = express()
routes(app)
ErrorHandler.handler(app)


app.listen(3000, () => {
    console.log('app running in 3000 port')
})