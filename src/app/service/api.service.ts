import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { retryWhen } from 'rxjs/operator/retryWhen';

@Injectable()
export class ApiService {
  selectedProject:any;
  //baseUrl = "https://ashesi-hub.herokuapp.com/"
  baseUrl="http://localhost:3000/"

  constructor(public http: Http, public router: Router) { }

  getProjects(){

    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/getProjectsSummary", "{}", options).map(res => res.json())

  }

  getProjectsById(userId){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/getProjectById", userId, options).map(res => res.json())

  }

  getBeneficiariesOverTime(userId){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/getBeneficiariesOverTime", userId, options).map(res => res.json())

  }

  getSpendingOverTime(userId){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/getSpendingOverTime", userId, options).map(res => res.json())

  }

  getVolunteersOverTime(userId){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/getVolunteersOverTime", userId, options).map(res => res.json())

  }

  rangeVolunteersOverTime(data){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/rangeVolunteersOverTime", data, options).map(res => res.json())

  }

  volunteersBreakdown(data){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/volunteersBreakdown", data, options).map(res => res.json())

  }

  rangeBeneficiariesOverTime(data){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/rangeBeneficiariesOverTime", data, options).map(res => res.json())

  }

  beneficiariesBreakdown(data){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/beneficiariesBreakdown", data, options).map(res => res.json())

  }

  rangeSpendingOverTime(data){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/rangeSpendingOverTime", data, options).map(res => res.json())

  }

  spendingBreakdown(data){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/spendingBreakdown", data, options).map(res => res.json())

  }

  addComments(data){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/addComment", data, options).map(res => res.json())

  }

  updateProject(data){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/updateProject", data, options).map(res => res.json())

  }

  deleteProject(projectId){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+"api/deleteProjectById", projectId).map(res => res.json());
  }

}
