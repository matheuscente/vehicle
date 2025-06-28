
import { InternalServerError } from "../errors/internal-server.error"
import {completeBus, iBusInBD, iBusRepository, iBusService } from "../models/bus.model"
import { iVehicle, iVehicleServiceAndRepository } from "../models/vehicle.model"
import { runInTransaction } from "../dbUtils/runInTransaction.utils"

export class BusService implements iBusService {
    private busRepository: iBusRepository
    private vehicleService: iVehicleServiceAndRepository
    constructor(busRepository: iBusRepository, vehicleService: iVehicleServiceAndRepository) {
        this.vehicleService = vehicleService
        this.busRepository = busRepository
    }

    getById(id: number): iBusInBD | undefined {
        const bus = this.busRepository.getById(id)
        if(!bus) return undefined
        return bus as iBusInBD
    }

    getAll(): Array<iBusInBD> {
        const buses = this.busRepository.getAll()
        return buses as iBusInBD[]
    }

    create(bus: completeBus): void {
        runInTransaction(() => {
          const createVehicle: iVehicle = {
              plate: bus.plate,
              model: bus.model,
              manufactureYear: bus.manufactureYear,
              brand: bus.brand,
            };
            const vehicleId = this.vehicleService.create(createVehicle);
            if (vehicleId) {
              this.busRepository.create({
                id: vehicleId,
                hasBathroom: bus.hasBathroom,
                seatsNumber: bus.seatsNumber,
              });
        
              return;
            }
        
            throw new InternalServerError("falha ao criar ônibus");
        })
    }

    update(id: number, data: completeBus): void {
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
      this.busRepository.update(id, {
        seatsNumber: data.seatsNumber,
        hasBathroom: data.hasBathroom,
      });

      return;
    }

    throw new InternalServerError("falha ao atualizar ônibus");
       })
  }

    delete(id: number): void {
        this.vehicleService.delete(id)
    }
}