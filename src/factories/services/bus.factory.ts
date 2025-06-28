import { BusService } from "../../services/bus.service";
import { busRepository } from "../repositories/bus.factory";
import { vehicleService } from "./vehicle.factory";

export const busService = new BusService(busRepository, vehicleService)