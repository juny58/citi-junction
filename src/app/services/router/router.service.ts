import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  currentRoute: string = this.router.url
  currentAbsoluteRoute: string = this.router.url.split('?')[0]

  constructor(public router: Router) {
    router.events.pipe(
      filter(ev => ev instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = router.url
      this.currentAbsoluteRoute = this.router.url.split('?')[0]
    })
  }
}
