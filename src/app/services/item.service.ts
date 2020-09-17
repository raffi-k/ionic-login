import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../models/pagination.model';
import { Store } from '@ngxs/store';
import { Get, AddItem } from '../actions/item.actions';
import { Item } from '../models/item.model';

// for local
// const URL = 'http://localhost:8080/api/items/';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  constructor(private http: HttpClient, private store: Store) { }

  get(pagination: Pagination) {
    const url = "http://demo9924148.mockable.io/api/items/findAll";

    this.http.get(url).subscribe(
      (data: Item[]) => {
        return this.store.dispatch(new Get(data, pagination));
      }
    );
  }

  addItem(item: Item) {
    if(item.name && item.imageUrl) {
      const url = "http://demo9924148.mockable.io/api/item/addItem";

      this.http.post(url, item).subscribe(
        (data: Item) => this.store.dispatch(new AddItem(data))
      );
    }
  }
}
