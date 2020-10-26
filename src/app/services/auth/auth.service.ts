import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalstorageService, LocalStorageValues } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: UserInterface = {
    userToken: null,
    name: null,
    email: null,
    phone: null,
    password: null,
    _id: null,
    registeredOn: null,
    role: null,
    savedAddresses: []
  }

  constructor(private httpClient: HttpClient, private localStorageService: LocalstorageService) { }

  getUserById(_id?: string) {
    if (_id == undefined) {
      _id = localStorage.getItem(LocalStorageValues.userId)
    }
    this.httpClient.get<UserInterface>(environment.apiPath + "/api/users/get-user-by-id", { params: { _id } }).subscribe(data => {
      this.user = data
    })
  }

  async getCurrentUser() {
    return new Promise(resolve => {
      if (this.user.email) {
        resolve()
      } else {
        let _id = localStorage.getItem(LocalStorageValues.userId)

        this.httpClient.get<UserInterface>(environment.apiPath + "/api/users/get-user-by-id", { params: { _id } }).subscribe(data => {
          this.user = data
          resolve()
        })
      }
    })
  }

  createUser(d: UserInterface) {
    return this.httpClient.post<UserInterface>(environment.apiPath + "/api/users/create-user", d)
  }

  updateUser(d) {
    return this.httpClient.post(environment.apiPath + "/api/users/update-user", d)
  }

  getUserByEmailAndPassword(email, password) {
    return this.httpClient.get<UserInterface>(environment.apiPath + "/api/users/get-user-by-email-and-password", { params: { email, password } })
  }
}

export interface UserInterface {
  userToken?: string;
  name: string;
  email: string;
  phone: string;
  registeredOn?: number;
  role: 'admin' | 'user';
  password: string;
  _id?: string;
  pushToken?: string;
  savedAddresses?: {
    coordinates: {
      lat: number;
      long: number
    };
    details: string;
    landMark: string;
    country?: string;
    state?: string;
    pincode?: number;
    distanceInKm: number;
    distanceText: string
  }[]
}
