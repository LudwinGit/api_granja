import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginatedResponse<TItem> {
    data: TItem[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export function PaginatedResponse<TItem>(TItemClass: Type<TItem>): Type<IPaginatedResponse<TItem>> {
    @ObjectType(`${TItemClass.name}PaginatedResponse`, { isAbstract: true })
    abstract class PaginatedResponseClass {
        @Field(() => [TItemClass])
        data: TItem[];

        @Field(() => Int)
        total: number;

        @Field(() => Int)
        page: number;

        @Field(() => Int)
        pageSize: number;

        @Field(() => Int)
        totalPages: number;
    }
    return PaginatedResponseClass as Type<IPaginatedResponse<TItem>>;
}
