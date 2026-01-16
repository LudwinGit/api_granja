export class PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;

    constructor(partial: Partial<PaginatedResult<T>>) {
        Object.assign(this, partial);
    }
}