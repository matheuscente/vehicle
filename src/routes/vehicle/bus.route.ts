import express from "express"
import { RoutesDataValidator } from "../../middlewares/data-validator.middleware"
import { idSchemaValidate} from "../../models/params.model"
import { busSchemaValidade } from "../../models/bus.model"
import { busController } from "../../factories/controllers/bus.factory"


export const busRoutes: express.Router = express.Router()

busRoutes.get('/', busController.getAll.bind(busController))
busRoutes.get('/:id',RoutesDataValidator.paramsValidator(idSchemaValidate), busController.getById.bind(busController))
busRoutes.post('/', RoutesDataValidator.bodyValidator(busSchemaValidade), busController.create.bind(busController))
busRoutes.put('/:id',  RoutesDataValidator.paramsValidator(idSchemaValidate),  RoutesDataValidator.bodyValidator(busSchemaValidade), busController.update.bind(busController))
busRoutes.delete('/:id', RoutesDataValidator.paramsValidator(idSchemaValidate), busController.delete.bind(busController))
