import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  currentRoute: string = this.router.url
  currentAbsoluteRoute: string = this.router.url.split('?')[0]

  firstRouteDone = new BehaviorSubject(null)
  firstRouteDoneState = this.firstRouteDone.asObservable()

  constructor(public router: Router) {
    router.events.pipe(
      filter(ev => ev instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = router.url
      this.currentAbsoluteRoute = this.router.url.split('?')[0]
    })

    router.events.pipe(
      take(1)
    ).subscribe(() => {
      this.firstRouteDone.next(true)
    })
  }

  doFirstRouting(path: string) {
    this.firstRouteDoneState.subscribe(()=>{
      this.router.navigateByUrl(path)
    })
  }
}
