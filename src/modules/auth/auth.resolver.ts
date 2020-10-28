import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthInput } from './input/auth.input';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Mutation(() => User, { nullable: true })
    async login(@Args('data') input: AuthInput) {
        return this.authService.login(input)
    }
}
