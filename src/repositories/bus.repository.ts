import Database from "better-sqlite3";
import { busWithId, iBus, iBusInBD, iBusRepository } from "../models/bus.model";
import { iVehicleServiceAndRepository } from "../models/vehicle.model";
import { ValidationError } from "../errors/valiation.error";
import { InternalServerError } from "../errors/internal-server.error";

export class BusRepository implements iBusRepository {
  private database: Database.Database;
  private vehicleService: iVehicleServiceAndRepository;
  constructor(
    database: Database.Database,
    vehicleService: iVehicleServiceAndRepository
  ) {
    this.database = database;
    this.vehicleService = vehicleService;
  }
  getAll(): Array<iBusInBD> {
    const Buss: unknown = this.database
      .prepare(
        `
            SELECT
            *
            FROM buses AS b
            INNER JOIN vehicles AS v ON v.id = b.id;
            `
      )
      .all();

    return Buss as iBusInBD[];
  }

  getById(id: number): iBusInBD | undefined {
    const bus: unknown = this.database
      .prepare(
        `
            SELECT
            *
            FROM buses AS b
            INNER JOIN vehicles AS v ON v.id = b.id
            WHERE b.id = ?;
            `
      )
      .get(id);

    if (!bus) return undefined;

    return bus as iBusInBD;
  }

  create(bus: busWithId): void {
    try {
      this.database
        .prepare(
          `
            INSERT INTO buses (id, has_bathroom, seats_number)
            VALUES (?, ?, ?);

            `
        )
        .run(bus.id, bus.hasBathroom ? 1 : 0, bus.seatsNumber);
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

  update(id: number, data: iBus): void {
    try {
      this.database
        .prepare(
          `
            UPDATE buses
            SET has_bathroom = ?, seats_number = ?
            WHERE id = ?;
            `
        )
        .run(data.hasBathroom ? 1 : 0, data.seatsNumber, id);
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
