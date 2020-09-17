import { State, Action, StateContext, Selector } from '@ngxs/store';
import { LogoutUser, SetLoggedIn } from './../actions/user.actions';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

export class UserStateModel {
    email: string;
    isLoggedIn: boolean;
}

@State<UserStateModel>({
    name: 'isLoggedIn',
    defaults: {
        email: '',
        isLoggedIn: false
    }
})

@Injectable()
export class UserState {

    constructor(private authService: AuthenticationService, private store: Store, private router: Router) {}

    @Action(LogoutUser)
    logout({ getState, patchState }: StateContext<UserStateModel>) {
        patchState({
            email: '',
            isLoggedIn: false
        });
        this.router.navigate(['login']);
    }

    @Action(SetLoggedIn)
    setLoggedIn({ getState, patchState }: StateContext<UserStateModel>, { payload }: SetLoggedIn) {
        patchState({
            email: payload.email,
            isLoggedIn: true
        });
        if(this.router.url.search("/login")) {
            this.router.navigate(['home']);
        }
    }
}