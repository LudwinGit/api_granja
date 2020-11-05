import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PasswordService } from '../common/services/password.service';
import { EmployeesService } from '../employees/employees.service';
import { Employee } from '../employees/entities/employees.entity';
import { Permission } from '../permissions/permission.entity';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Employee,Permission]),PermissionsModule],
  providers: [UsersResolver, UsersService, PasswordService, EmployeesService],
  exports: [UsersService]
})
export class UsersModule { }
