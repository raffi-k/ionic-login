import { User } from '../models/user.model';

export class LogoutUser {
    static readonly type = "[User] Logout";

    constructor() {}
}

export class SetLoggedIn {
    static readonly type = "[User] Set Logged In";

    constructor(public payload: User) {}
}