import { iVehicle } from "./vehicle.model";
import { Joi } from "celebrate";
import { id } from "./vehicle.model";

export interface iMoto {
  displacements: number;
  startType: "manual" | "eletric";
}

export type motoWithId = iMoto & id;

export type completeMoto = iMoto & iVehicle;

export type iMotoInBD = completeMoto & id;

export interface iMotoService {
  getById(id: number): iMotoInBD | undefined;
  getAll(): Array<iMotoInBD>;
  create(moto: completeMoto): void;
  update(id: number, data: completeMoto): void;
  delete(id: number): void;
}

export interface iMotoRepository {
  getById(id: number): iMotoInBD | undefined;
  getAll(): Array<iMotoInBD>;
  create(moto: motoWithId): void;
  update(id: number, data: iMoto): void;
  delete(id: number): void;
}

export const motoSchemaValidade = Joi.object()
  .keys({
    displacements: Joi.number().required(),
    startType: Joi.valid("manual", "eletric").required(),
    plate: Joi.string().max(40).required(),
    brand: Joi.string().max(40).required(),
    model: Joi.string().max(40).required(),
    manufactureYear: Joi.number().max(new Date().getFullYear()).required(),
  })
  .options({ abortEarly: false });
