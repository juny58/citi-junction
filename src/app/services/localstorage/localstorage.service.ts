import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
}

export enum LocalStorageValues {
  "userId" = "userId"
}