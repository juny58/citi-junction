import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  term: string = ""

  constructor() { }

  searchTyped() {
    console.log(this.term)
  }
}