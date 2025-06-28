import database from "../../database";
import { BusRepository } from "../../repositories/bus.repository";
import { VehicleService } from "../../services/vehicle.service";
import { VehicleRepository } from "../../repositories/vehicle.repository";

const vehicleService = new VehicleService(new VehicleRepository(database))
export const busRepository = new BusRepository(database, vehicleService)