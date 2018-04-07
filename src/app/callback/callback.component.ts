import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth-service.service"

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.handleAuthentication()
  }

}
