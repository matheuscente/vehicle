import { iVehicle } from "./vehicle.model";
import { Joi } from "celebrate";

export interface iMoto extends iVehicle {
    cilindradas: number,
    tipoPatida: 'manual' | 'eletrica'
}

export const motoSchemaValidade = Joi.object().keys({
        cilindradas: Joi.number().required(),
        tipoPartida: Joi.valid("manual", "eletrica"),
        placa: Joi.string().max(50).required(),
        marca: Joi.string().max(50).required(),
        modelo: Joi.string().max(50).required(),
        anoFabricacao: Joi.number().max(new Date().getFullYear())

    }).options({abortEarly: false})