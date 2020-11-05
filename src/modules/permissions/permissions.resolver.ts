import { Args, Query, Resolver } from '@nestjs/graphql';
import { Permission } from './permission.entity';
import { PermissionsService } from './permissions.service';

@Resolver(() => Permission)
export class PermissionsResolver {
    constructor(
        private readonly permissionService: PermissionsService
    ) { }

    @Query(() => [Permission])
    async permissions(): Promise<Permission[]> {
        return this.permissionService.findAll()
    }

    @Query(() => [Permission])
    async permissionsWithoutAddingtoUser(@Args('userId') userId: number): Promise<Permission[]> {
        return this.permissionService.permissionsWithoutAddingtoUser(userId)
    }
}
