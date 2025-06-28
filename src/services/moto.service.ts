
import { runInTransaction } from "../dbUtils/runInTransaction.utils"
import { InternalServerError } from "../errors/internal-server.error"
import {completeMoto, iMotoInBD, iMotoRepository, iMotoService } from "../models/moto.model"
import { iVehicle, iVehicleServiceAndRepository } from "../models/vehicle.model"

export class MotoService implements iMotoService {
    private motoRepository: iMotoRepository
    private vehicleService: iVehicleServiceAndRepository
    constructor(motoRepository: iMotoRepository, vehicleService: iVehicleServiceAndRepository) {
        this.vehicleService = vehicleService
        this.motoRepository = motoRepository
    }

    getById(id: number): iMotoInBD | undefined {
        const moto = this.motoRepository.getById(id)
        if(!moto) return undefined
        return moto as iMotoInBD
    }

    getAll(): Array<iMotoInBD> {
        const motos = this.motoRepository.getAll()
        return motos as iMotoInBD[]
    }

    create(moto: completeMoto): void {
        runInTransaction(() => {
          const createVehicle: iVehicle = {
              plate: moto.plate,
              model: moto.model,
              manufactureYear: moto.manufactureYear,
              brand: moto.brand,
            };
            const vehicleId = this.vehicleService.create(createVehicle);
            if (vehicleId) {
              this.motoRepository.create({
                id: vehicleId,
                displacements: moto.displacements,
                startType: moto.startType,
              });
        
              return;
            }
        
            throw new InternalServerError("falha ao criar moto");
        })
    }

    update(id: number, data: completeMoto): void {
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
              this.motoRepository.update(id, {
                startType: data.startType,
                displacements: data.displacements,
              });
        
              return;
            }
        
            throw new InternalServerError("falha ao atualizar moto");
        })
        
    }

    delete(id: number): void {
        this.vehicleService.delete(id)
    }
}