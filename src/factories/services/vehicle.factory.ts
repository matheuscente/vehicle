import { VehicleService } from "../../services/vehicle.service";
import { vehicleRepository } from "../repositories/vehicle.factory";

export const vehicleService = new VehicleService(vehicleRepository)