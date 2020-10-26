import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { AuthInput } from "./input/auth.input";
import { PasswordService } from "../common/services/password.service";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly pwdService: PasswordService

    ) { }

    async validateAuth(input: AuthInput) {
        const user = await this.userService.findByUsername(input.username)
        if (!user)
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        const validate = this.pwdService.verify(input.password, user.password)
        if (!validate)
            throw new HttpException('Credentials Not Found', HttpStatus.NOT_FOUND);
        return user
    }

    async login(input:AuthInput):Promise<User>{
        return this.validateAuth(input)
    }
}