import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reflections-page',
  templateUrl: './reflections-page.component.html',
  styleUrls: ['./reflections-page.component.scss']
})
export class ReflectionsPageComponent implements OnInit {

  reflections: Array<any> = [];
  selectedReflection:any;
  constructor(public api:ApiService,public router: Router) { }

  ngOnInit() {

    if(!this.api.selectedProject){
      this.router.navigate(["/home"])
    }

    if(this.api.selectedProject){
      this.api.selectedProject.project.activities.forEach(element => {
        this.reflections.push(...element.reflections)
      })
      //console.log(this.activities)
    }
  }


  selectreflection(reflections){
    this.selectedReflection = reflections
  }

}
