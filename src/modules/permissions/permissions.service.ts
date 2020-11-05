import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>
    ){}
    
    async  findAll():Promise<Permission[]> {
        return this.permissionRepository.find({order:{name:"ASC"}})
    }

    async  find(id:number):Promise<Permission> {
        return this.permissionRepository.findOne(id)
    }

    async permissionsWithoutAddingtoUser(userId:number):Promise<Permission[]>{
        const permissions = await
            this.permissionRepository
                .createQueryBuilder("permission")
                .leftJoinAndSelect("permission.users", "user","user.id=:userId",{userId})
                .where("user.id is null")
                .orderBy("permission.name")
                .getMany()
        return permissions
    }

    async create(name:string):Promise<Permission>{
        const permission = this.permissionRepository.create({name})
        await this.permissionRepository.save(permission)
        return permission
    }
}
