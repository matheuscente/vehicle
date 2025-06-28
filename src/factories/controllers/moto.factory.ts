import { motoService } from "../../factories/services/moto.factory";
import { MotoController } from "../../controllers/moto.controller";

export const motoController = new MotoController(motoService)