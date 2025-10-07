export type Paginated<T> = {
    size: number,
    count: number,
    totalPages: number,
    data: T[],
}