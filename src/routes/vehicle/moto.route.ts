import express from "express"
import { RoutesDataValidator } from "../../middlewares/data-validator.middleware"
import { idSchemaValidate} from "../../models/params.model"
import { motoSchemaValidade } from "../../models/moto.model"
import { motoController } from "../../factories/controllers/moto.factory"


export const motoRoutes: express.Router = express.Router()

motoRoutes.get('/', motoController.getAll.bind(motoController))
motoRoutes.get('/:id',RoutesDataValidator.paramsValidator(idSchemaValidate), motoController.getById.bind(motoController))
motoRoutes.post('/', RoutesDataValidator.bodyValidator(motoSchemaValidade), motoController.create.bind(motoController))
motoRoutes.put('/:id',  RoutesDataValidator.paramsValidator(idSchemaValidate),  RoutesDataValidator.bodyValidator(motoSchemaValidade), motoController.update.bind(motoController))
motoRoutes.delete('/:id', RoutesDataValidator.paramsValidator(idSchemaValidate), motoController.delete.bind(motoController))
