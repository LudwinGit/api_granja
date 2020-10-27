import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Client } from './client.entity';
import { ClientsService } from './clients.service';
import { ClientInput } from './input/client.input';

@Resolver(() => Client)
export class ClientsResolver {
    constructor(
        private readonly clientService: ClientsService
    ) { }

    @Query(() => [Client], { nullable: true })
    async clients(): Promise<Client[]> {
        return this.clientService.findAll()
    }

    @Query(() => Client, { nullable: true })
    async client(id: number): Promise<Client> {
        return this.clientService.find(id)
    }

    @Query(() => [Client], { nullable: true })
    async clientsByRoute(@Args('routeId') routeId: number): Promise<Client[]> {
        return this.clientService.findByRoute(routeId)
    }

    @Mutation(() => Client)
    async createClient(@Args('data') input: ClientInput): Promise<Client> {
        return this.clientService.create(input)
    }

    @Mutation(() => Client)
    async updateClient(@Args('id') id: number, @Args('data') input: ClientInput): Promise<Client> {
        return this.clientService.update(id, input)
    }

    @Mutation(() => Client, { nullable: true })
    async removeClient(@Args('id') id: number): Promise<Client> {
        return this.clientService.delete(id)
    }
}
