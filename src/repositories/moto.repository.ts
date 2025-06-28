import Database from "better-sqlite3";
import {
  iMoto,
  iMotoInBD,
  iMotoRepository,
  motoWithId,
} from "../models/moto.model";
import { iVehicleServiceAndRepository } from "../models/vehicle.model";
import { ValidationError } from "../errors/valiation.error";
import { InternalServerError } from "../errors/internal-server.error";

export class MotoRepository implements iMotoRepository {
  private database: Database.Database;
  private vehicleService: iVehicleServiceAndRepository;
  constructor(
    database: Database.Database,
    vehicleService: iVehicleServiceAndRepository
  ) {
    this.database = database;
    this.vehicleService = vehicleService;
  }
  getAll(): Array<iMotoInBD> {
    const motos: unknown = this.database
      .prepare(
        `
            SELECT
            *
            FROM motos AS m
            INNER JOIN vehicles AS v ON v.id = m.id;
            `
      )
      .all();

    return motos as iMotoInBD[];
  }

  getById(id: number): iMotoInBD | undefined {
    const moto: unknown = this.database
      .prepare(
        `
            SELECT
            *
            FROM motos AS m
            INNER JOIN vehicles AS v ON v.id = m.id
            WHERE m.id = ?;
            `
      )
      .get(id);

    if (!moto) return undefined;

    return moto as iMotoInBD;
  }

  create(moto: motoWithId): void {
    try {
      this.database
        .prepare(
          `
            INSERT INTO motos (id, displacements, start_type)
            VALUES (?, ?, ?);

            `
        )
        .run(moto.id, moto.displacements, moto.startType);
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

  update(id: number, data: iMoto): void {
    try {
      this.database
        .prepare(
          `
            UPDATE motos
            SET displacements = ?, start_type = ?
            WHERE id = ?;
            `
        )
        .run(data.displacements, data.startType, id);
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
