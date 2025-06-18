import { vehiclerRoutes } from "./vehicle/vehicle.route";
import express from "express"

export const routes = (app: express.Express) => {
    app.use(express.json())
    app.use(vehiclerRoutes)
}
