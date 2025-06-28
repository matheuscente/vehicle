import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found.error";
import { completeMoto, iMotoService } from "../models/moto.model";

export class MotoController {
  private motoService: iMotoService;
  constructor(motoService: iMotoService) {
    this.motoService = motoService;
  }

  getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const motos = this.motoService.getAll();
      if (motos.length === 0) throw new NotFoundError("Not found motos");
      res.status(200).json(motos);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  getById(req: Request, res: Response, next: NextFunction) {
    try {
      const motoId: number = Number(req.params.id);
      const moto = this.motoService.getById(motoId);

      if (!moto) {
        throw new NotFoundError("not found moto in this id");
      }
      res.status(200).json(moto);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  create(req: Request, res: Response, next: NextFunction) {
    try {
      const moto: completeMoto = req.body;
      this.motoService.create(moto);
      res.status(201).json({ message: "Moto created sucessfully" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  update(req: Request, res: Response, next: NextFunction) {
    try {
      const motoId: number = Number(req.params.id);
      const moto: completeMoto = req.body;
      this.motoService.update(motoId, moto);

      res.status(200).json({ message: "Moto updated sucessfully" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  delete(req: Request, res: Response, next: NextFunction) {
    try {
      const motoId: number = Number(req.params.id);
      this.motoService.delete(motoId);
      res.status(204).send();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
