import express, { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/valiation.error";
import { NotFoundError } from "../errors/not-found.error";
import { InternalServerError } from "../errors/internal-server.error";
import {errors} from "celebrate"

export abstract class ErrorHandler {
    static handler(app: express.Express) {
        app.use(errors())
        app.use((err: Error, req: Request, res: Response, next: NextFunction) =>  {
            if(err instanceof ValidationError || err instanceof NotFoundError) {
                err.send(res)
            } else {
                new InternalServerError().send(res)
            }

        })
    }
}
