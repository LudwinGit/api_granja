import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserInput } from './input/user.input';
import { PasswordService } from '../common/services/password.service';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly pwdService: PasswordService,
        private readonly employeeService: EmployeesService,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find({ relations: ['employee'] })
    }

    async find(id: number): Promise<User> {
        return this.userRepository.findOne({ id }, { relations: ['employee'] })
    }

    async create(input: UserInput): Promise<User> {
        input.password = this.pwdService.hash(input.password);
        const user = this.userRepository.create(input)
        const employee = await this.employeeService.find(input.employeeId)
        if (!employee)
            throw new HttpException('Employee Not Found', HttpStatus.NOT_FOUND);
        user.employee = employee
        await this.userRepository.save(user)
        return user
    }

    async update(id: number, input: UserInput): Promise<User> {
        const user: User = await this.userRepository.findOne(id)
        if (!user)
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        user.password = this.pwdService.hash(input.password);
        user.username = input.username
        await this.userRepository.update(id, user)
        return user
    }

    async remove(id: number) {
        const user: User = await this.userRepository.findOne(id)
        if (!user)
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        await this.userRepository.delete(user)
        return null
    }

    async deactivate(id: number) {
        const user: User = await this.userRepository.findOne(id, { relations: ['employee'] })
        if (!user)
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        user.isActive = false
        await this.userRepository.update(id, user)
        return user;
    }

    async findByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({ username })
    }
}
