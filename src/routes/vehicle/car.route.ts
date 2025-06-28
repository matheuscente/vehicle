import express from "express"
import { RoutesDataValidator } from "../../middlewares/data-validator.middleware"
import { idSchemaValidate} from "../../models/params.model"
import { carSchemaValidade } from "../../models/car.model"
import { carController } from "../../factories/controllers/car.factory"


export const carRoutes: express.Router = express.Router()

carRoutes.get('/', carController.getAll.bind(carController))
carRoutes.get('/:id',RoutesDataValidator.paramsValidator(idSchemaValidate), carController.getById.bind(carController))
carRoutes.post('/', RoutesDataValidator.bodyValidator(carSchemaValidade), carController.create.bind(carController))
carRoutes.put('/:id',  RoutesDataValidator.paramsValidator(idSchemaValidate),  RoutesDataValidator.bodyValidator(carSchemaValidade), carController.update.bind(carController))
carRoutes.delete('/:id', RoutesDataValidator.paramsValidator(idSchemaValidate), carController.delete.bind(carController))
