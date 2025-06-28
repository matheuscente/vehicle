import { runInTransaction } from "../dbUtils/runInTransaction.utils";
import { InternalServerError } from "../errors/internal-server.error";
import {
  completeCar,
  iCarInBD,
  iCarRepository,
  iCarService,
} from "../models/car.model";
import {
  iVehicle,
  iVehicleServiceAndRepository,
} from "../models/vehicle.model";

export class CarService implements iCarService {
  private carRepository: iCarRepository;
  private vehicleService: iVehicleServiceAndRepository;
  constructor(
    carRepository: iCarRepository,
    vehicleService: iVehicleServiceAndRepository
  ) {
    this.vehicleService = vehicleService;
    this.carRepository = carRepository;
  }

  getById(id: number): iCarInBD | undefined {
    const car = this.carRepository.getById(id);
    if (!car) return undefined;
    return car as iCarInBD;
  }

  getAll(): Array<iCarInBD> {
    const cars = this.carRepository.getAll();
    return cars as iCarInBD[];
  }

  create(car: completeCar): void {
    runInTransaction(() => {
      const createVehicle: iVehicle = {
      plate: car.plate,
      model: car.model,
      manufactureYear: car.manufactureYear,
      brand: car.brand,
    };
    const vehicleId = this.vehicleService.create(createVehicle);
    
    if (vehicleId) {
      this.carRepository.create({
        id: vehicleId,
        doorsNumber: car.doorsNumber,
        fuelType: car.fuelType,
      });

      return;
    }

    throw new InternalServerError("falha ao criar carro");
    })
  }

  update(id: number, data: completeCar): void {
    runInTransaction(() => {
      const updateVehicle: iVehicle = {
      plate: data.plate,
      model: data.model,
      manufactureYear: data.manufactureYear,
      brand: data.brand,
    };
    this.vehicleService.update(id, updateVehicle);
    const vehicle = this.vehicleService.getById(id);
    if (vehicle) {
      this.carRepository.update(id, {
        doorsNumber: data.doorsNumber,
        fuelType: data.fuelType,
      });

      return;
    }

    throw new InternalServerError("falha ao atualizar carro");
    })
  }

  delete(id: number): void {
    this.vehicleService.delete(id);
  }
}
