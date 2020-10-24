import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserInput } from './input/user.input';
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { PasswordService } from '../common/services/password.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly pwdService: PasswordService
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    async find(id: number): Promise<User> {
        return this.userRepository.findOne({ id })
    }

    async create(input: UserInput): Promise<User> {
        input.password = this.pwdService.hash(input.password);
        const user = this.userRepository.create(input)
        await this.userRepository.save(user)
        return user
    }


}
