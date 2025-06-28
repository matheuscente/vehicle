import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found.error";
import { completeCar } from "../models/car.model";
import { iCarService } from "../models/car.model";

export class CarController {
  private carService: iCarService;
  constructor(carService: iCarService) {
    this.carService = carService;
  }
  getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = this.carService.getAll();
      if (cars.length === 0) throw new NotFoundError("Not found cars");
      res.status(200).json(cars);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  getById(req: Request, res: Response, next: NextFunction) {
    try {
      const carId: number = Number(req.params.id);
      const car = this.carService.getById(carId);

      if (!car) {
        throw new NotFoundError("not found car in this id");
      }
      res.status(200).json(car);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  create(req: Request, res: Response, next: NextFunction) {
    try {
      const car: completeCar = req.body;
      this.carService.create(car);
      res.status(201).json({ message: "Car created sucessfully" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  update(req: Request, res: Response, next: NextFunction) {
    try {
      const carId: number = Number(req.params.id);
      const car: completeCar = req.body;
      this.carService.update(carId, car);

      res.status(200).json({ message: "Car updated sucessfully" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  delete(req: Request, res: Response, next: NextFunction) {
    try {
      const carId: number = Number(req.params.id);
      this.carService.delete(carId);
      res.status(204).send();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
