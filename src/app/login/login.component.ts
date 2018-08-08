import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth-service.service"
import { Router } from '../../../node_modules/@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,public auth: AuthService) { }

  ngOnInit() {

  }


  login(){
    this.auth.login();
  }

  // isLoggedIn(){
  //   return this.auth.isAuthenticated()
  // }


}
