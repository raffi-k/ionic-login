import { Item } from '../models/item.model';
import { Pagination } from '../models/pagination.model';

export class AddItem {
    static readonly type = "[Item] Add";

    constructor(public payload: Item) {}
}

export class Get {
    static readonly type = "[Items] Get";

    constructor(public payload: Item[], public pagination: Pagination) {}
}