"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const base_error_1 = require("../errors/base.error");
class ErrorHandler {
    static handler(app) {
        app.use((err, req, res, next) => {
            if (err instanceof base_error_1.ErrorBase) {
                err.send(res);
            }
        });
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=error-handler.middleware.js.map