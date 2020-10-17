import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HeaderIcon } from './app.interface';
import { Router } from '@angular/router';
import { WidthService } from './services/width/width.service';
import { SearchService } from './services/search/search.service';
import { RouterService } from './services/router/router.service';
import { InitializeService } from './services/initialize/initialize.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  headerIcons: Array<HeaderIcon> = [{
    name: 'home',
    fn: () => this.navigateTo('/app/home'),
    title: "Home",
    path: "/app/home"
  },
  {
    name: 'wallet',
    fn: () => this.navigateTo('/app/offers'),
    title: "Exciting Offers",
    path: "/app/offers"
  },
  {
    name: 'person',
    fn: () => this.navigateTo('/app/profile'),
    title: "My Account",
    path: "/app/profile"
  },
  {
    name: 'settings',
    fn: () => this.navigateTo('/app/settings'),
    title: "Settings",
    path: "/app/settings"
  }]

  navigateTo(path) {
    //console.log(path)
    this.router.navigateByUrl(path)
  }

  width: number

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public widthService: WidthService,
    public searchService: SearchService,
    public routerService: RouterService,
    public initializeService: InitializeService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.widthService.currentWidth.subscribe(w => {
      this.width = w
      //console.log(w);      
    })

    this.platform.backButton.subscribe(() => {
      if (this.router.url == "/app/home") {
        navigator['app'].exitApp()
      }
    })
  }

  searchTyped(v) {
    this.searchService.searchTyped()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#eb445a");
      this.splashScreen.hide();
    });
  }

  downloadApp() {
    window.open("https://www.cityjunction.in/android-app")
  }
}
