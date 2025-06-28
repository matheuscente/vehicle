import database from "../../database";
import { VehicleRepository } from "../../repositories/vehicle.repository";

export const vehicleRepository = new VehicleRepository(database)