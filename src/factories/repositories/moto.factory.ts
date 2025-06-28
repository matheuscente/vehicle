import database from "../../database";
import { MotoRepository } from "../../repositories/moto.repository";
import { VehicleService } from "../../services/vehicle.service";
import { VehicleRepository } from "../../repositories/vehicle.repository";

const vehicleService = new VehicleService(new VehicleRepository(database))
export const motoRepository = new MotoRepository(database, vehicleService)