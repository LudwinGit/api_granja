import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ConsolidateService } from './consolidate.service';
import { Consolidate } from './entities/consolidate.entity';
import { CreateConsolidateInput } from './dto/create-consolidate.input';
import { UpdateConsolidateInput } from './dto/update-consolidate.input';

@Resolver(() => Consolidate)
export class ConsolidateResolver {
  constructor(private readonly consolidateService: ConsolidateService) {}

  @Mutation(() => Consolidate)
  createConsolidate(@Args('createConsolidateInput') createConsolidateInput: CreateConsolidateInput) {
    return this.consolidateService.create(createConsolidateInput);
  }

  @Query(() => [Consolidate], { name: 'consolidate' })
  findAll() {
    return this.consolidateService.findAll();
  }

  @Query(() => Consolidate, { name: 'consolidate' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.consolidateService.findOne(id);
  }

  @Mutation(() => Consolidate)
  updateConsolidate(@Args('updateConsolidateInput') updateConsolidateInput: UpdateConsolidateInput) {
    return this.consolidateService.update(updateConsolidateInput.id, updateConsolidateInput);
  }

  @Mutation(() => Consolidate)
  removeConsolidate(@Args('id', { type: () => Int }) id: number) {
    return this.consolidateService.remove(id);
  }
}
