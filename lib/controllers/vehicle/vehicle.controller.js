"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerVehicle = void 0;
const valiation_error_1 = require("../../errors/valiation.error");
const not_found_error_1 = require("../../errors/not-found.error");
let id = 0;
const users = [];
class ControllerVehicle {
    static getAll(req, res, next) {
        try {
            res.status(200).json(users);
        }
        catch (err) {
            next(err);
        }
    }
    static getById(req, res, next) {
        try {
            const userId = Number(req.params.id);
            const user = users.find((user) => user.id === userId);
            if (!user) {
                throw new not_found_error_1.NotFoundError('not found user in this id');
            }
            res.status(200).json({ user });
        }
        catch (err) {
            next(err);
        }
    }
    static create(req, res, next) {
        try {
            const newUser = {
                id: ++id,
                nome: req.body.nome,
                email: req.body.email,
            };
            if (!newUser.nome || newUser.nome.length === 0) {
                throw new valiation_error_1.ValidationError('invalid name');
            }
            else if (!newUser.email || newUser.email.length === 0) {
                throw new valiation_error_1.ValidationError('invalid email');
            }
            users.push(newUser);
            res.status(201).json({ message: "usuario criado com sucesso" });
        }
        catch (err) {
            next(err);
        }
    }
    static update(req, res, next) {
        var _a, _b;
        try {
            const userId = Number(req.params.id);
            const indexItem = users.findIndex((user) => user.id === userId);
            if (indexItem !== -1) {
                users[indexItem].email = (_a = req.body.email) !== null && _a !== void 0 ? _a : users[indexItem].email;
                users[indexItem].nome = (_b = req.body.nome) !== null && _b !== void 0 ? _b : users[indexItem].nome;
                res.status(201).json({ message: "usuario modificado com sucesso" });
                return;
            }
            res.status(201).json({ message: "usuario não encontrado" });
        }
        catch (err) {
            next(err);
        }
    }
    static delete(req, res, next) {
        try {
            const userId = Number(req.params.id);
            const indexItem = users.findIndex((user) => user.id === userId);
            if (indexItem !== -1) {
                users.splice(indexItem, 1);
                res.status(200).json({ message: "usuario deletado" });
                return;
            }
            res.status(400).json({ message: "usuario nao encontrado" });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ControllerVehicle = ControllerVehicle;
//# sourceMappingURL=vehicle.controller.js.map