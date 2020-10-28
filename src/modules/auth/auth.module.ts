import { Module } from '@nestjs/common';
import { PasswordService } from '../common/services/password.service';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
    imports:[UsersModule],
    providers:[AuthService,PasswordService, AuthResolver],
    exports:[AuthService],
})
export class AuthModule {
}
