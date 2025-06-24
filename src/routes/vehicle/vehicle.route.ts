import express from "express"
import { ControllerVehicle } from "../../controllers/vehicle/vehicle.controller"
import { RoutesDataValidator } from "../../middlewares/data-validator.middleware"
import { idSchemaValidate} from "../../models/params.model"
import { motoSchemaValidade } from "../../models/moto.model"


export const vehiclerRoutes: express.Router = express.Router()

vehiclerRoutes.get('/vehicles', ControllerVehicle.getAll)
vehiclerRoutes.get('/vehicles/:id',RoutesDataValidator.paramsValidator(idSchemaValidate), ControllerVehicle.getById)
vehiclerRoutes.post('/vehicles',RoutesDataValidator.bodyValidator(motoSchemaValidade), ControllerVehicle.create)
vehiclerRoutes.put('/vehicles/:id', ControllerVehicle.update)
vehiclerRoutes.delete('/vehicles/:id', ControllerVehicle.delete)
