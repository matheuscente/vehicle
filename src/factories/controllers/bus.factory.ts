import { busService } from "../../factories/services/bus.factory";
import { BusController } from "../../controllers/bus.controller";

export const busController = new BusController(busService)