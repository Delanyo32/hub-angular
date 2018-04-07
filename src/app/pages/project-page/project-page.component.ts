import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth-service.service"
import { ApiService } from "../../service/api.service"
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {
  projectAggregations:any
  projectData:any

  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Lives'} 
   ];
   monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']
  public lineChartLabels:Array<any>;
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[]


  public barChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148, 214, 177,0.5)',
      borderColor: 'rgba(148, 214, 177,1)',
      pointBackgroundColor: 'rgba(148, 214, 177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148, 214, 177,0.8)'
    }
  ];

  
  public barChartOptions2:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels2:string[];
  public barChartType2:string = 'bar';
  public barChartLegend2:boolean = true;
 
  public barChartData2:any[]



  constructor(public api:ApiService,public router: Router) { }

  ngOnInit() {

    if(!this.api.selectedProject){
      this.router.navigate(["/home"])
    }else{
        
    
    var id = {
      "id":this.api.selectedProject._id
    }


    this.api.getProjectsById(id).subscribe(data=>{
      //console.log(data)
      this.projectAggregations = data.aggs
      this.projectData = data.project
    })


    this.api.getBeneficiariesOverTime(id).subscribe(data=>{
      var months =[]
      var values = []
      data.data.forEach(element => {
        var date = new Date(element.key).getMonth()
        //console.log(date)
        months.push(this.monthsArray[date])

        var value = element.beneficiary_sum.value
        values.push(value)

      });
      //console.log(months)
      this.lineChartLabels = months 
      this.lineChartData = [
        {data: values, label: 'Lives'}
      ]

    })

    this.api.getSpendingOverTime(id).subscribe(data=>{
    
      var months =[]
      var values = []
      data.data.forEach(element => {
        var date = new Date(element.key).getMonth()
        //console.log(date)
        months.push(this.monthsArray[date])

        var value = element.spending_sum.value
        values.push(value)

      });
      //console.log(months)
      this.barChartLabels = months 
      this.barChartData = [
        {data: values, label: 'Spending'}
      ]

    })


    this.api.getVolunteersOverTime(id).subscribe(data=>{
    
      var months =[]
      var values = []
      data.data.forEach(element => {
        var date = new Date(element.key).getMonth()
        //console.log(date)
        months.push(this.monthsArray[date])

        var value = element.volunteers_count.value
        values.push(value)

      });
      //console.log(months)
      this.barChartLabels2 = months 
      this.barChartData2 = [
        {data: values, label: 'Volunteers'}
      ]

    })
    }


  }

  

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}

