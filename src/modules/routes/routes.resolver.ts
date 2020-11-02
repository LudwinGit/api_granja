import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Route } from './entities/route.entity';
import { RoutesService } from './routes.service';
import { RouteInput } from './input/rote.input';

@Resolver(() => Route)
export class RoutesResolver {
    constructor(
        private readonly routeService: RoutesService,
    ) { }

    @Query(()=>[Route],{nullable:true})
    async routesWithoutAddingtoSeller(@Args('sellerId') sellerId:number){
        return this.routeService.routesWithoutAddingtoSeller(sellerId)
    }

    @Query(() => [Route], { nullable: true })
    async routes() {
        return this.routeService.findAll()
    }

    @Query(() => Route, { nullable: true })
    async route(@Args('id') id: number) {
        return this.routeService.find(id)
    }

    @Mutation(() => Route, { nullable: true })
    async createRoute(@Args('data') input: RouteInput) {
        return this.routeService.create(input)
    }

    @Mutation(() => Route, { nullable: true })
    async updateRoute(@Args('id') id: number, @Args('data') input: RouteInput) {
        return this.routeService.update(id, input)
    }

    @Mutation(() => Route, { nullable: true })
    async removeRoute(@Args('id') id: number){
        return this.routeService.delete(id)
    }
}
