import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { Store } from '@ngxs/store';
import { Pagination } from '../models/pagination.model';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('0.6s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('0.3s ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class HomePage implements OnInit {

  items: Item[] = [];
  pagination: Pagination = {
    pageSize: 4,
    page: 1
  }
  newItem: Item = {
    name: '',
    imageUrl: '',
    id: 0
  }

  constructor(private itemService: ItemService, private authService: AuthenticationService, private store: Store) {}

  ngOnInit() {
    this.getItems();
    this.store.subscribe(
      state => {
        this.items = state.items.items;
        this.pagination.page = state.items.page;
      }
    )
  }

  getItems() {
    this.itemService.get(this.pagination);
  }

  logout() {
    this.authService.logout(); 
  }

  addItem() {
    this.itemService.addItem(this.newItem);
  }

  refreshPage(event) {
    this.pagination.page = 1;
    this.itemService.get(this.pagination);
    event.target.complete();
  }

}
