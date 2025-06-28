import { iVehicle } from "./vehicle.model";
import { Joi } from "celebrate";
import { id } from "./vehicle.model";

export interface iBus {
  seatsNumber: number;
  hasBathroom: boolean;
}

export type busWithId = iBus & id;

export type completeBus = iBus & iVehicle;

export type iBusInBD = completeBus & id;
export interface iBusService {
  getById(id: number): iBusInBD | undefined;
  getAll(): Array<iBusInBD>;
  create(bus: completeBus): void;
  update(id: number, data: completeBus): void;
  delete(id: number): void;
}

export interface iBusRepository {
  getById(id: number): iBusInBD | undefined;
  getAll(): Array<iBusInBD>;
  create(bus: busWithId): void;
  update(id: number, data: iBus): void;
  delete(id: number): void;
}

export const busSchemaValidade = Joi.object()
  .keys({
    seatsNumber: Joi.number().required(),
    hasBathroom: Joi.bool().required(),
    plate: Joi.string().max(40).required(),
    brand: Joi.string().max(40).required(),
    model: Joi.string().max(40).required(),
    manufactureYear: Joi.number().max(new Date().getFullYear()).required(),
  })
  .options({ abortEarly: false });
