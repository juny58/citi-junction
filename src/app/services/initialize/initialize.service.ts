import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InitializeService {

  initializeParams

  constructor(private httpClient: HttpClient) { 
    this.getInitializingParams()
  }

  getInitializingParams() {
    this.httpClient.get(environment.apiPath + "/api/auth/initialize").subscribe(d => {
      this.initializeParams = d
      //console.log(d)
    })
  }
}
