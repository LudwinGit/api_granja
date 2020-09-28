import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './interfaces/employees.interface';
import { createEmployeeInput } from "./dto/create-employee.input";
import { Warehouse } from '../warehouses/interfaces/warehouse.interface';

@Injectable()
export class EmployeesService {
    constructor(@InjectModel('Employee') private readonly modelEmployee: Model<Employee>,) { }
    
    async findAll(): Promise<Employee[]> {
        return await this.modelEmployee.find().exec();
    }

    async findOneById(id:String): Promise<Employee>{
        return await this.modelEmployee.findById(id);
    }

    async create(newInput: createEmployeeInput): Promise<Employee>{
        newInput.name = newInput.name.toUpperCase()
        newInput.lastname = newInput.lastname.toUpperCase()
        return await this.modelEmployee.create(newInput)
    }

    async update(id: String,updateInput: createEmployeeInput):Promise<Employee>{
        updateInput.name = updateInput.name.toUpperCase()
        updateInput.lastname = updateInput.lastname.toUpperCase()
        return await this.modelEmployee.findByIdAndUpdate(id,updateInput,{new: false})
    }

    async delete(id:String):Promise<Employee>{
        return await this.modelEmployee.findByIdAndRemove(id)
    }

    async addWarehouse(idEmployee:String,warehouse:Warehouse):Promise<Employee>{
        const employee = await this.modelEmployee.findById(idEmployee)
        employee.warehouses.push(warehouse)
        return await employee.save()
    }
}
