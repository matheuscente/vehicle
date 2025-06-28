import database from "../../database";
import { CarRepository } from "../../repositories/car.repository";
import { VehicleService } from "../../services/vehicle.service";
import { VehicleRepository } from "../../repositories/vehicle.repository";

const vehicleService = new VehicleService(new VehicleRepository(database))
export const carRepository = new CarRepository(database, vehicleService)