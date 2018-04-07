import { Component, OnInit } from "@angular/core";
import { AuthService } from "../service/auth-service.service"
import { ApiService } from "../service/api.service"
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
    projects:Array<any> =[];

    constructor(public auth: AuthService,public api:ApiService,public router: Router) { }

    ngOnInit() { 
        this.getProjects()
        this.auth.getProfile()
    }

    isLoggedIn(){
        return this.auth.isAuthenticated()
    }

    login(){
        this.auth.login()
    }

    getProjects(){
        this.api.getProjects().subscribe(data=>{
            if(data.status){
                this.projects = data.data
            }
        })
    }

    selectProject(project){
        this.api.selectedProject = project
        //console.log(project)
        this.router.navigate(["/project"])
    }

}
