import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../service/api.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.scss']
})
export class ApplicationPageComponent implements OnInit {
  applicationData:any
  appData:Array<any>;
  projectleads:Array<any>;
  targetComs:Array<any>;

  constructor(public api:ApiService,public router: Router) { }

  ngOnInit() {

    if(!this.api.selectedProject){
      this.router.navigate(["/home"])
    }

    
    this.appData = []
    this.projectleads = []
    this.targetComs = []

    if(this.api.selectedProject && this.api.selectedProject.applicationData){
      this.applicationData = this.api.selectedProject.applicationData
      var projectleads = this.api.selectedProject.applicationData.projectLeads
      var targetComs = this.api.selectedProject.applicationData.targetCommunity
      for (var key in this.applicationData) {
        if (this.applicationData.hasOwnProperty(key)) {
            if(this.applicationData[key].constructor !== Array){
              this.appData.push({k:key,v:this.applicationData[key]})
            }else{
              console.log(key ,this.applicationData[key])
              // this.applicationData[key].forEach(element => {
              //   for (var key in element) {
              //     if (element.hasOwnProperty(key)) {
              //       this.appData.push({k:key,v:element[key]})
              //     }
              //   }
              // });
            }
        }
    }

    targetComs.forEach(element => {
      for (var key in element) {
        if (element.hasOwnProperty(key)) {
          this.targetComs.push({k:key,v:element[key]})
        }
      }
    });

    projectleads.forEach(element => {
      for (var key in element) {
        if (element.hasOwnProperty(key)) {
          this.projectleads.push({k:key,v:element[key]})
        }
      }
    });
    console.log(this.targetComs)
    console.log(this.projectleads)
    console.log(this.appData)
    }
  }
  formatTitle(text){
    return text.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
  }
}
