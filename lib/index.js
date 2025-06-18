"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const error_handler_middleware_1 = require("./middlewares/error-handler.middleware");
const app = (0, express_1.default)();
(0, routes_1.routes)(app);
error_handler_middleware_1.ErrorHandler.handler(app);
app.listen(3000, () => {
    console.log('app running in 3000 port');
});
//# sourceMappingURL=index.js.map