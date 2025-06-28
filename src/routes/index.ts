import { busRoutes } from "./vehicle/bus.route";
import { carRoutes } from "./vehicle/car.route";
import { motoRoutes } from "./vehicle/moto.route";
import express, { Router } from "express"

export const routes = (app: express.Express) => {
    app.use(express.json())
    
    const api = Router()
    api.use('/motos', motoRoutes)
    api.use('/buses', busRoutes)
    api.use('/cars', carRoutes)
    app.use('/api/v1', api)
}
