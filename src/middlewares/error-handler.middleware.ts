import express, { Request, Response, NextFunction } from "express";

import { ErrorBase } from "../errors/base.error";

export abstract class ErrorHandler {
    static handler(app: express.Express) {
        app.use((err: Error, req: Request, res: Response, next: NextFunction) =>  {
            if(err instanceof ErrorBase) {
                err.send(res)
            }

        })
    }
}
