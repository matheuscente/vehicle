import Database from "better-sqlite3";
import {
  iVehicle,
  iVehicleInBD,
  iVehicleServiceAndRepository,
} from "../models/vehicle.model";
import { InternalServerError } from "../errors/internal-server.error";
import { ValidationError } from "../errors/valiation.error";

export class VehicleRepository implements iVehicleServiceAndRepository {
  private database: Database.Database;
  constructor(database: Database.Database) {
    this.database = database;
  }

  getById(id: number): iVehicleInBD | undefined {
    const vehicle: unknown = this.database
      .prepare(
        `
            SELECT * FROM vehicles AS v
            WHERE v.id = ?
            `
      )
      .get(id);

    if (!vehicle) return undefined;

    return vehicle as iVehicleInBD;
  }
  getAll(): Array<iVehicleInBD> {
    const vehicles: unknown = this.database
      .prepare(
        `
            select
            *
            FROM vehicles
            `
      )
      .all();

    return vehicles as iVehicleInBD[];
  }

  create(vehicle: iVehicle): number {
    try {
      return this.database
        .prepare(
          `
            INSERT INTO vehicles (manufacture_year, brand, model, plate)
            VALUES (?, ?, ?, ?)

            `
        )
        .run(
          vehicle.manufactureYear,
          vehicle.brand,
          vehicle.model,
          vehicle.plate
        ).lastInsertRowid as number;
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

  update(id: number, data: iVehicle): void {
    try {
      this.database
        .prepare(
          `
            UPDATE vehicles
            SET manufacture_year = ?, brand = ?, model = ?, plate = ?
            WHERE id = ?
            `
        )
        .run(data.manufactureYear, data.brand, data.model, data.plate, id);
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
    this.database
      .prepare(
        `
            DELETE FROM vehicles AS v
            WHERE v.id = ?`
      )
      .run(id);
  }
}
