import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  project:any;
  activities:Array<any> = []
  activityToggle:boolean = false
  selectedActivity:any;

  selectedVolunteer:any;
  volunteerToggle:boolean = false;
  volunteers:Array<any>

  selectedSpending:any
  spendingToggle:boolean = false
  spending:Array<any>;

  selectedBeneficiary:any
  beneficiaryToggle:boolean = false
  beneficiaries:Array<any>;



  constructor(public api:ApiService,public router: Router) { }

  ngOnInit() {
    if(!this.api.selectedProject){
      this.router.navigate(["/home"])
    }else{
      this.project = Object.assign(this.api.selectedProject,{})
      //console.log(this.project)
      this.activities = this.project.project.activities

      this.volunteers = []
      this.spending = []
      this.beneficiaries = []

      this.activities.forEach(element => {
        this.volunteers.push(...element.volunteers)
        this.beneficiaries.push(...element.beneficiaries)
        this.spending.push(...element.spending)
      });

      //console.log(this.volunteers,this.beneficiaries,this.spending)
    }
  }

  apiSave(){
    this.project.project.activities = this.activities
    this.api.updateProject(this.project).subscribe(response=>{
      console.log(response)
    })
  }

  open(activity){
    this.selectedActivity = {...activity}
    this.activityToggle = true
  }

  close(){
    this.activityToggle = false
  }

  save(){
    var newArr = this.activities.map((el)=>{
      if(el.id===this.selectedActivity.id){
        el = this.selectedActivity
        return el
      }else{
        return el
      }
    })    
    this.activities = newArr
    this.activityToggle = false
    this.apiSave()
  }



  volunteerOpen(volunteer){
    this.selectedVolunteer = {...volunteer}
    this.volunteerToggle = true
  }

  volunteerClose(){
    this.volunteerToggle = false
  }

  volunteerSave(){
    console.log(this.selectedVolunteer)
    var newArr = this.volunteers.map((el)=>{
      if(el.timestamp===this.selectedVolunteer.timestamp){
        el = this.selectedVolunteer
        return el
      }else{
        return el
      }
    })
    
    this.volunteers = newArr
    this.volunteerToggle = false
    this.saveToDb(this.selectedVolunteer)
  }

  spendingOpen(spending){
    this.selectedSpending = {...spending}
    this.spendingToggle = true
  }

  spendingClose(){
    this.spendingToggle = false
  }

  spendingSave(){
    //console.log(this.selectedSpending)
    var newArr = this.spending.map((el)=>{
      if(el.timestamp===this.selectedSpending.timestamp){
        el = this.selectedSpending
        return el
      }else{
        return el
      }
    })
    
    this.spending = newArr
    this.spendingToggle = false
    this.saveToDb(this.selectedSpending)
  }


  beneficiaryOpen(beneficiary){
    this.selectedBeneficiary = {...beneficiary}
    this.beneficiaryToggle = true
  }

  beneficiaryClose(){
    this.beneficiaryToggle = false
  }

  beneficiarySave(){
    //console.log(this.selectedBeneficiary)
    var newArr = this.beneficiaries.map((el)=>{
      if(el.timestamp===this.selectedBeneficiary.timestamp){
        el = this.selectedBeneficiary
        return el
      }else{
        return el
      }
    })
    
    this.beneficiaries = newArr
    this.beneficiaryToggle = false
    this.saveToDb(this.selectedBeneficiary)
    //console.log(this.activities)
  }


  saveToDb(obj){
    var newArray = [...this.activities]
    newArray.forEach(element => {
      if(element.volunteers){
        var newVol = element.volunteers.map(e => {
          if(e.timestamp === obj.timestamp){
              e = obj
              return e
          }else{
            return e
          }
        });
        element.volunteers = newVol
      }
      

      if(element.spending){
        var newSpend = element.spending.map(e => {
          if(e.timestamp === obj.timestamp){
            e = obj
            return e
          }else{
            return e
          }
        });
        element.spending = newSpend
      }
      

      if(element.beneficiaries){
        var newBen = element.beneficiaries.map(e => {
          if(e.timestamp === obj.timestamp){
            e = obj
            return e
          }else{
            return e
          }
        });
      }
     element.beneficiaries = newBen
    });


    this.activities = newArray
    this.apiSave()
  }

}
