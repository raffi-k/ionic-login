import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user);
  }

  register() {
    this.authService.register(this.user);
  }

}
