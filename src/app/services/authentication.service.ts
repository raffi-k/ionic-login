import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserToken } from './../models/token.model';
import { Store } from '@ngxs/store';
import { SetLoggedIn, LogoutUser } from '../actions/user.actions';

const TOKEN_KEY = 'auth-token';
// for local
// const URL = 'http://localhost:8080/api/users/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private storage: Storage, private http: HttpClient, private store: Store) {
  }

  login(user: User) {
    if(user.email && user.password) {
      const url = "http://demo9924148.mockable.io/api/users/login";

      //api call to the server to return a token
      this.http.post(url, user).subscribe(
        (token: UserToken) => {
          //save token in storage
          this.storage.set(TOKEN_KEY, token.id).then(() => {
            //token set
          });
          this.store.dispatch(new SetLoggedIn(user));
        }
      );
    }
  }

  register(user: User) {
    if(user.email && user.password) {
      const url = "http://demo9924148.mockable.io/api/users/register";

      //api call to the server to return a token
      this.http.post(url, user).subscribe(
        (token: UserToken) => {
          //save token in storage
          this.storage.set(TOKEN_KEY, token.id).then(() => {
            //token set
          });
          this.store.dispatch(new SetLoggedIn(user));
        }
      );
    }
  }

  getUser(token: number) {
    const url = "http://demo9924148.mockable.io/api/users/getUser";

    return this.http.get(url);
  }

  logout() {
    const url = "http://demo9924148.mockable.io/api/users/logout";
    const email = this.store.snapshot().isLoggedIn.email;

    this.http.post(url, { email: email }).subscribe(
    () => {
      this.store.dispatch(new LogoutUser());
      return this.storage.remove(TOKEN_KEY);
    })
  }

  checkToken(): Promise<any> {
    return this.storage.get(TOKEN_KEY).then(token => {
      if(token) {
        return this.getUser(token).subscribe(
          (user: User) => {
            if(user) {
              this.store.dispatch(new SetLoggedIn(user))
              return true;
            }
            else return false;
          })
      }
    });
  }
}
