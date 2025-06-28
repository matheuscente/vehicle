export interface iVehicle {
  plate: string;
  brand: string;
  model: string;
  manufactureYear: number;
}

export interface id {
  id: number;
}

export type iVehicleInBD = iVehicle & id;

export interface iVehicleServiceAndRepository {
  getById(id: number): iVehicleInBD | undefined;
  getAll(): Array<iVehicleInBD>;
  create(vehicle: iVehicle): number;
  update(id: number, data: iVehicle): void;
  delete(id: number): void;
}
