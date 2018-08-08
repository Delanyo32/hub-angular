import { Component, OnInit } from '@angular/core';
import { config } from './chartConfig'
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements OnInit {
  fromDate:any = "2018-01-01"
  toDate:any = this.convertToDate(new Date().getTime())
  chartsData:any

  spending:Array<any> = []
  spendingGraphLabels:Array<any> = [];
  spendingGraphValues:Array<any>=[{
    data:[0],
    label:'spending'
  }];
  spendingBreakdownValues:number[] = [];
  spendingBreakdownLabels:string[] = []
 
  beneficiaries:Array<any> = []
  beneficiaryGraphLabels:Array<any> = [];
  beneficiaryGraphValues:Array<any>=[{
    data:[0],
    label:'beneficiary'
  }];
  beneficiaryBreakdownValues:number[] = [];
  beneficiaryBreakdownLabels:string[] = []

  volunteers:Array<any> = []
  volunteerGraphLabels:Array<any> = [];
  volunteerGraphValues:Array<any>=[{
    data:[0],
    label:'volunteers'
  }];
  volunteerBreakdownValues:number[] = [];
  volunteerBreakdownLabels:string[] = []



  constructor(public api:ApiService,public router: Router) { }

  ngOnInit() {
    this.chartsData = config
    if(this.api.selectedProject){
      var data = {
        id:this.api.selectedProject.id,
        min:this.convertToTimestamp(this.fromDate),
        max:this.convertToTimestamp(this.toDate)
      }
      
      this.getVolunteerData(data)
      this.getBeneficiariesData(data)
      this.getSpendingData(data)

    }else{
      this.router.navigate(["/home"])
    }
  }



  getSpendingData(data){

    this.api.rangeSpendingOverTime(data).subscribe(result=>{
      console.log(result)
      this.spending = result.data.list.map(entry =>{
        return entry._source
      })
       var labels = []
       var values = []

       this.spendingGraphValues = [{
        data:[],
        label:'spending'
      }] 
      this.spendingGraphLabels=[]

      result.data.aggregations.forEach(element => {
          var month = moment(element.key).format('MMMM')
          var value = element.spending_sum.value
   
          labels.push(month)
          values.push(value)
      });


      //this.beneficiaryGraphLabels = labels
      this.spendingGraphValues = [{
        data:values,
        label:'spending'
      }]
      setTimeout( () => {this.spendingGraphLabels = labels});
      console.log(this.spendingGraphLabels,this.spendingGraphValues)
  })

  this.api.spendingBreakdown(data).subscribe(result=>{
    console.log(result)
    var labels = []
    var values = []
   
    
    this.spendingBreakdownValues = []
    setTimeout( () => {this.spendingBreakdownLabels = []});

    result.data.forEach(element => {
      
      labels.push(element.key)
      values.push(element.spending_sum.value)
    });

   
    //this.volunteerBreakdownLabels = labels
    this.spendingBreakdownValues =values
    setTimeout( () => {this.spendingBreakdownLabels = labels});
    console.log(this.spendingBreakdownLabels,this.spendingBreakdownValues)

    
  })
  
  }


  getBeneficiariesData(data){

    this.api.rangeBeneficiariesOverTime(data).subscribe(result=>{
      console.log(result)
      this.beneficiaries = result.data.list.map(entry =>{
        return entry._source
      })
       var labels = []
       var values = []

       this.beneficiaryGraphValues = [{
        data:[],
        label:'beneficiaries'
      }] 
      this.beneficiaryGraphLabels=[]

      result.data.aggregations.forEach(element => {
          var month = moment(element.key).format('MMMM')
          var value = element.beneficiary_sum.value
   
          labels.push(month)
          values.push(value)
      });


      //this.beneficiaryGraphLabels = labels
      this.beneficiaryGraphValues = [{
        data:values,
        label:'beneficiaries'
      }]
      setTimeout( () => {this.beneficiaryGraphLabels = labels});
      console.log(this.beneficiaryGraphLabels,this.beneficiaryGraphValues)
  })

  this.api.beneficiariesBreakdown(data).subscribe(result=>{
    console.log(result)
    var labels = []
    var values = []
   
    
    this.beneficiaryBreakdownValues = []
    setTimeout( () => {this.beneficiaryBreakdownLabels = []});

    result.data.forEach(element => {
      
      labels.push(element.key)
      values.push(element.beneficiary_sum.value)
    });

   
    //this.volunteerBreakdownLabels = labels
    this.beneficiaryBreakdownValues =values
    setTimeout( () => {this.beneficiaryBreakdownLabels = labels});
    console.log(this.beneficiaryBreakdownLabels,this.beneficiaryBreakdownValues)

    
  })
  
  }



  getVolunteerData(data){

    this.api.rangeVolunteersOverTime(data).subscribe(result=>{
      console.log(result)
      this.volunteers = result.data.list.map(entry =>{
        return entry._source
      })
       var labels = []
       var values = []

       this.volunteerGraphValues = [{
        data:[],
        label:'volunteers'
      }] 
      this.volunteerGraphLabels=[]

      result.data.aggregations.forEach(element => {
          var month = moment(element.key).format('MMMM')
          var value = element.volunteers_count.value

          labels.push(month)
          values.push(value)

         

      });

      //this.volunteerGraphLabels = labels
      this.volunteerGraphValues = [{
        data:values,
        label:'volunteers'
      }]
      setTimeout( () => {this.volunteerGraphLabels = labels});
      console.log(this.volunteerGraphLabels,this.volunteerGraphValues)
  })

  this.api.volunteersBreakdown(data).subscribe(result=>{
    console.log(result)
    var labels = []
    var values = []
   
    
    this.volunteerBreakdownValues = []
    setTimeout( () => {this.volunteerBreakdownLabels = []});

    result.data.forEach(element => {
      
      labels.push(element.key)
      values.push(element.volunteers_count.value)
    });

   
    //this.volunteerBreakdownLabels = labels
    this.volunteerBreakdownValues =values
    setTimeout( () => {this.volunteerBreakdownLabels = labels});
    console.log(this.volunteerBreakdownLabels,this.volunteerBreakdownValues)

    
  })
  }

  convertToTimestamp(date){
    return new Date(date).getTime()
  }

  convertToDate(timestamp){
    var fullDate = moment(timestamp).format('YYYY-MM-DD')
    console.log(fullDate)
    return fullDate
  }

  search(){
    var data = {
      id:this.api.selectedProject.id,
      min:this.convertToTimestamp(this.fromDate),
      max:this.convertToTimestamp(this.toDate)
    }

    this.getVolunteerData(data)
    this.getBeneficiariesData(data)
    this.getSpendingData(data)
  }

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
