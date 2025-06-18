"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const vehicle_route_1 = require("./vehicle/vehicle.route");
const express_1 = __importDefault(require("express"));
const routes = (app) => {
    app.use(express_1.default.json());
    app.use(vehicle_route_1.vehiclerRoutes);
};
exports.routes = routes;
//# sourceMappingURL=index.js.map