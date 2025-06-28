import { MotoService } from "../../services/moto.service";
import { motoRepository } from "../repositories/moto.factory";
import { vehicleService } from "./vehicle.factory";

export const motoService = new MotoService(motoRepository, vehicleService)