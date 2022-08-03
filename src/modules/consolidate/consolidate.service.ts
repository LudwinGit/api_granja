import { Injectable } from '@nestjs/common';
import { CreateConsolidateInput } from './dto/create-consolidate.input';
import { UpdateConsolidateInput } from './dto/update-consolidate.input';

@Injectable()
export class ConsolidateService {
  create(createConsolidateInput: CreateConsolidateInput) {
    return 'This action adds a new consolidate';
  }

  findAll() {
    return `This action returns all consolidate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consolidate`;
  }

  update(id: number, updateConsolidateInput: UpdateConsolidateInput) {
    return `This action updates a #${id} consolidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} consolidate`;
  }
}
