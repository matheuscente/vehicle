import { CarService } from "../../services/car.service";
import { carRepository } from "../repositories/car.factory";
import { vehicleService } from "./vehicle.factory";

export const carService = new CarService(carRepository, vehicleService)