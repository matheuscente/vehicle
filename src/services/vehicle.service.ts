import { NotFoundError } from "../errors/not-found.error"
import {iVehicleServiceAndRepository, iVehicle, iVehicleInBD } from "../models/vehicle.model"

export class VehicleService implements iVehicleServiceAndRepository {
private vehicleRepository: iVehicleServiceAndRepository
constructor(vehicleRepository: iVehicleServiceAndRepository) {
this.vehicleRepository = vehicleRepository
}

    getById(id: number): iVehicleInBD | undefined {
        const vehicle = this.vehicleRepository.getById(id)
        if(!vehicle) return undefined
        return vehicle as iVehicleInBD
    }

    getAll(): Array<iVehicleInBD> {
        return this.vehicleRepository.getAll()
    }

    create(vehicle: iVehicle): number {
        return this.vehicleRepository.create(vehicle)
    }

    update(id: number, data: iVehicle): void {
        const hasVehicle = this.vehicleRepository.getById(id)
        if(!hasVehicle) throw new NotFoundError('not found vehiclees in this id')
        this.vehicleRepository.update(id, data)
        
    }

    delete(id: number): void {
        const hasVehicle = this.vehicleRepository.getById(id)
        if(!hasVehicle) throw new NotFoundError('not found vehiclees in this id')
        this.vehicleRepository.delete(id)
    }
}