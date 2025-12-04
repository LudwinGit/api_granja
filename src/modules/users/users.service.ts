import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserInput, UserInput } from './input/user.input';
import { PasswordService } from '../common/services/password.service';
import { EmployeesService } from '../employees/employees.service';
import { PermissionsService } from '../permissions/permissions.service';
import { Permission } from '../permissions/permission.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly pwdService: PasswordService,
        private readonly employeeService: EmployeesService,
        private readonly permissionService: PermissionsService
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find({ relations: ['employee', 'permissions'] })
    }

    async find(id: number): Promise<User> {
        return this.userRepository.findOne({ id }, { relations: ['employee', 'permissions'] })
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

    async update(id: number, input: UpdateUserInput): Promise<User> {
        const user: User = await this.userRepository.findOne(id)
        if (!user)
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

        if (input.password)
            input.password = this.pwdService.hash(input.password);
        
        user.username = input.username
        await this.userRepository.update(id, user)
        return user
    }

    async remove(id: number): Promise<User> {
        const user: User = await this.userRepository.findOne(id)
        if (!user)
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        await this.userRepository.delete(user)
        return null
    }

    async deactivate(id: number): Promise<User> {
        const user: User = await this.userRepository.findOne(id, { relations: ['employee'] })
        if (!user)
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        user.isActive = false
        await this.userRepository.update(id, user)
        return user;
    }

    async findByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({ username }, { relations: ['employee'] })
    }

    async addPermission(userId: number, permissionId: number): Promise<Permission> {
        const user = await this.userRepository.findOne({ id: userId }, { relations: ["permissions"] })
        const permission = await this.permissionService.find(permissionId)
        const a = user.permissions.filter((e) => e.id === permissionId)

        if (a.length !== 0)
            throw new HttpException('¡El permiso ya ha sido agregado!', HttpStatus.INTERNAL_SERVER_ERROR);
        user.permissions = [...user.permissions, permission]
        await this.userRepository.save(user)
        return permission
    }

    async removePermission(userId: number, permissionId: number): Promise<Permission> {
        const user = await this.userRepository.findOne({ id: userId }, { relations: ["permissions"] })
        const permissions = user.permissions.filter((e) => e.id !== permissionId)
        user.permissions = permissions
        await this.userRepository.save(user)
        return null
    }
}
