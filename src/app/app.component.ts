import { Component,  OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ApiService } from './service/api.service';
import { AuthService } from './service/auth-service.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
    showMenu:boolean = false;
    showHeader:any;
    showSide: any;
    visible: boolean = false;
    showTopbar: boolean;
    ShowSidebar: boolean;

    hideData(){
        this.router.events.forEach((event) => {
        if(event instanceof NavigationEnd) {
            this.showMenu = event.url !== "/login";
            // this.showSide = event.url !== "/home";
            }
        });

        this.router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
            this.showHeader = event.url !== "/login";
            }
        });
    }

    hideOnHome(){
        this.router.events.forEach((event) => {
            if(event instanceof NavigationEnd) {
                this.showMenu = event.url !== "/home";
                // this.showSide = event.url !== "/home";
            }
        });
    }

    ngAfterViewInit() { 
        this.hideData();
        this.hideOnHome();
    }

    constructor(private router: Router,public api:ApiService,public auth: AuthService,) {
        // this.hideData();
        
    }
}
