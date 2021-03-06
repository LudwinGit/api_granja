import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createEmployeeInput } from "./input/create-employee.input";
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Employee } from './entities/employees.entity';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
    ) { }
    
    async findAll(): Promise<Employee[]> {
        return await this.employeeRepository.find({relations:["seller"]});
    }

    async withoutSeller(): Promise<Employee[]>{
        const employees = await
            this.employeeRepository
            .createQueryBuilder("employee")
            .leftJoinAndSelect("employee.seller","seller")
            .where("seller.employee is null")
            .getMany()
        return employees
    }

    async withoutUser(): Promise<Employee[]>{
        const employees = await
            this.employeeRepository
            .createQueryBuilder("employee")
            .leftJoinAndSelect("employee.user","user")
            .where("user.employee is null")
            .getMany()
        return employees
    }

    async find(id:number): Promise<Employee>{
        return await this.employeeRepository.findOne(id,{relations:["seller"]})
    }

    async create(input: createEmployeeInput): Promise<Employee>{
        input.name = input.name.toUpperCase()
        input.lastname = input.lastname.toUpperCase()
        const employee = await this.employeeRepository.create(input)
        await this.employeeRepository.save(employee)
        return employee
    }

    async update(id: number,input: createEmployeeInput):Promise<Employee>{
        input.name = input.name.toUpperCase()
        input.lastname = input.lastname.toUpperCase()
        let employee: Employee = await this.employeeRepository.findOne(id)
        if (!employee)
            throw new HttpException('Employee Not Found', HttpStatus.NOT_FOUND);
        await this.employeeRepository.update(id,input)
        return employee
    }

    async delete(id:number):Promise<Employee>{
        const employee: Employee = await this.employeeRepository.findOne(id)
        if (!employee)
            throw new HttpException('Employee Not Found', HttpStatus.NOT_FOUND);
        await this.employeeRepository.remove(employee)
        return null
    }
}
