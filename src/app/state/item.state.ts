import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Item } from './../models/item.model';
import { AddItem, Get } from './../actions/item.actions';

export class ItemStateModel {
    items: Item[];
    page: number;
    pageSize: number;
}

@State<ItemStateModel>({
    name: 'items',
    defaults: {
        items: [],
        page: 1,
        pageSize: 4
    }
})

export class ItemState {

    @Selector()
    static getItems(state: ItemStateModel) {
        return state.items;
    }

    @Action(Get)
    get({ getState, patchState }: StateContext<ItemStateModel>, { payload, pagination }: Get) {
        const state = getState();

        //if pagination is 1 => either refresh or first time
        const items = pagination.page === 1 ? payload : state.items.concat(payload);
        patchState({
            items: items,
            page: state.page + 1
        });
    }

    @Action(AddItem)
    add({ getState, patchState }: StateContext<ItemStateModel>, { payload }: AddItem) {
        const state = getState();
        patchState({
            items: [...state.items, payload]
        });
    }
}