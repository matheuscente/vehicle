import Database from "better-sqlite3";
import { carWithId, iCar, iCarInBD, iCarRepository } from "../models/car.model";
import { iVehicleServiceAndRepository } from "../models/vehicle.model";
import { InternalServerError } from "../errors/internal-server.error";
import { ValidationError } from "../errors/valiation.error";

export class CarRepository implements iCarRepository {
  private database: Database.Database;
  private vehicleService: iVehicleServiceAndRepository;
  constructor(
    database: Database.Database,
    vehicleService: iVehicleServiceAndRepository
  ) {
    this.database = database;
    this.vehicleService = vehicleService;
  }
  getAll(): Array<iCarInBD> {
    const cars: unknown = this.database
      .prepare(
        `
            SELECT
            *
            FROM cars AS c
            INNER JOIN vehicles AS v ON v.id = c.id;
            `
      )
      .all();

    return cars as iCarInBD[];
  }

  getById(id: number): iCarInBD | undefined {
    const car: unknown = this.database
      .prepare(
        `
            SELECT
            *
            FROM cars AS c
            INNER JOIN vehicles AS v ON v.id = c.id
            WHERE c.id = ?;
            `
      )
      .get(id);

    if (!car) return undefined;

    return car as iCarInBD;
  }

  create(car: carWithId): void {
    try {
      this.database
        .prepare(
          `
            INSERT INTO cars (id, fuel_type, doors_number)
            VALUES (?, ?, ?);

            `
        )
        .run(car.id, car.fuelType, car.doorsNumber);
    } catch (err) {
      if (err instanceof Database.SqliteError) {
        if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
          throw new ValidationError("duplicate plate");
        }
        throw new InternalServerError("Internal server error");
      }
      throw new InternalServerError("Internal server error");
    }
  }

  update(id: number, data: iCar): void {
    try {
      this.database
        .prepare(
          `
            UPDATE cars
            SET fuel_type = ?, doors_number = ?
            WHERE id = ?;
            `
        )
        .run(data.fuelType, data.doorsNumber, id);
    } catch (err) {
      if (err instanceof Database.SqliteError) {
        if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
          throw new ValidationError("duplicate plate");
        }
        throw new InternalServerError("Internal server error");
      }
      throw new InternalServerError("Internal server error");
    }
  }

  delete(id: number): void {
    this.vehicleService.delete(id);
  }
}
