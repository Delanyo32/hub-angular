import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';
import { AuthService } from './service/auth-service.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private router: Router,public api:ApiService,public auth: AuthService,) {
        
    }
}
