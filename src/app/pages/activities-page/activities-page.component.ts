import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import Avatar from 'avatar-initials';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.scss']
})
export class ActivitiesPageComponent implements OnInit {
  activities:Array<any>=[];
  selectedActivity:any;
  comment:string = ""

  constructor(public api:ApiService,public router: Router) { }

  ngOnInit() {

    if(!this.api.selectedProject){
      this.router.navigate(["/home"])
    }

    if(this.api.selectedProject){
      this.activities = this.api.selectedProject.project.activities
      //console.log(this.activities)
    }
 }

 selectActivity(activity){
    this.selectedActivity = activity
 }

 closePannel(){
   this.selectedActivity = null
 }

 postComment(){
    var data={
      id:this.api.selectedProject.owner_id,
      activityId:this.selectedActivity.id,
      comment:this.comment
    }
    
    this.api.addComments(data).subscribe(data=>{
      this.comment = ""
      if(this.selectedActivity.comments){
        this.selectedActivity.comments.push(data.data.comment)
      }else{
        this.selectedActivity.comments = []
        this.selectedActivity.comments.push(data.data.comment)
      }
      
    })
 }

}
