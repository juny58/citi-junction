import { Injectable } from '@angular/core';
import { Observable, observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidthService {

  setCurrentWidth = new BehaviorSubject(window.innerWidth)
  currentWidth = this.setCurrentWidth.asObservable()
  screenWidth: number = window.innerWidth

  constructor() {
    window.onresize = () => {
      this.setCurrentWidth.next(window.innerWidth)
      this.screenWidth = window.innerWidth
    }
  }
}
