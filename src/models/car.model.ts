import { iVehicle } from "./vehicle.model";
import { Joi } from "celebrate";
import { id } from "./vehicle.model";

export interface iCar {
  doorsNumber: number;
  fuelType: "flex" | "gasoline" | "alcohol";
}
export type carWithId = iCar & id;

export type completeCar = iCar & iVehicle;

export type iCarInBD = completeCar & id;

export interface iCarService {
  getById(id: number): iCarInBD | undefined;
  getAll(): Array<iCarInBD>;
  create(car: completeCar): void;
  update(id: number, data: completeCar): void;
  delete(id: number): void;
}

export interface iCarRepository {
  getById(id: number): iCarInBD | undefined;
  getAll(): Array<iCarInBD>;
  create(car: carWithId): void;
  update(id: number, data: iCar): void;
  delete(id: number): void;
}

export const carSchemaValidade = Joi.object()
  .keys({
    doorsNumber: Joi.number().required(),
    fuelType: Joi.valid("flex", "gasoline", "alcohol").required(),
    plate: Joi.string().max(40).required(),
    brand: Joi.string().max(40).required(),
    model: Joi.string().max(40).required(),
    manufactureYear: Joi.number().max(new Date().getFullYear()).required(),
  })
  .options({ abortEarly: false });
