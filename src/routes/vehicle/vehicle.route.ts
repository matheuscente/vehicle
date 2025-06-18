import express from "express"
import { ControllerVehicle } from "../../controllers/vehicle/vehicle.controller"

export const vehiclerRoutes: express.Router = express.Router()

vehiclerRoutes.get('/users', ControllerVehicle.getAll)
vehiclerRoutes.get('/users/:id', ControllerVehicle.getById)
vehiclerRoutes.post('/users', ControllerVehicle.create)
vehiclerRoutes.put('/users/:id', ControllerVehicle.update)
vehiclerRoutes.delete('/users/:id', ControllerVehicle.delete)
