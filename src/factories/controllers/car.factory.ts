import { carService } from "../../factories/services/car.factory";
import { CarController } from "../../controllers/car.controller";

export const carController = new CarController(carService)