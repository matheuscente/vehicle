"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = require("../../controllers/vehicle/vehicle.controller");
exports.vehiclerRoutes = express_1.default.Router();
exports.vehiclerRoutes.get('/users', vehicle_controller_1.ControllerVehicle.getAll);
exports.vehiclerRoutes.get('/users/:id', vehicle_controller_1.ControllerVehicle.getById);
exports.vehiclerRoutes.post('/users', vehicle_controller_1.ControllerVehicle.create);
exports.vehiclerRoutes.put('/users/:id', vehicle_controller_1.ControllerVehicle.update);
exports.vehiclerRoutes.delete('/users/:id', vehicle_controller_1.ControllerVehicle.delete);
//# sourceMappingURL=vehicle.route.js.map