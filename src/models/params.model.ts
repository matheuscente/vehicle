import { Joi } from "celebrate";

export const idSchemaValidate = Joi.object().keys({
    id: Joi.number().required()
})