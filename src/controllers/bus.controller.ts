import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found.error";
import { completeBus, iBusService } from "../models/bus.model";

export class BusController {
  private busService: iBusService;
  constructor(busService: iBusService) {
    this.busService = busService;
  }
  getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const buses = this.busService.getAll();
      if (buses.length === 0) throw new NotFoundError("Not found buses");
      res.status(200).json(buses);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  getById(req: Request, res: Response, next: NextFunction) {
    try {
      const busId: number = Number(req.params.id);
      const bus = this.busService.getById(busId);

      if (!bus) {
        throw new NotFoundError("not found bus in this id");
      }
      res.status(200).json(bus);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  create(req: Request, res: Response, next: NextFunction) {
    try {
      const bus: completeBus = req.body;
      this.busService.create(bus);
      res.status(201).json({ message: "Bus created sucessfully" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  update(req: Request, res: Response, next: NextFunction) {
    try {
      const busId: number = Number(req.params.id);
      const bus: completeBus = req.body;
      this.busService.update(busId, bus);

      res.status(200).json({ message: "Bus updated sucessfully" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  delete(req: Request, res: Response, next: NextFunction) {
    try {
      const busId: number = Number(req.params.id);
      this.busService.delete(busId);
      res.status(204).send();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
