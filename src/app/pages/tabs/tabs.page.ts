import { Component } from '@angular/core';
import { TabInterface, SlotEnum } from './tabs.interface';
import { WidthService } from 'src/app/services/width/width.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  currentWindowWidth = window.innerWidth

  tabs: Array<TabInterface> = [
    {
      name: "Home",
      route: 'home',
      icon: 'home',
      isActive: true,
      slot: SlotEnum.both,
      available: true
    },
    {
      name: "Offers",
      route: 'offers',
      icon: 'wallet',
      isActive: false,
      slot: SlotEnum.both,
      available: false
    },
    {
      name: "Media",
      route: 'media',
      icon: 'videocam',
      isActive: false,
      slot: SlotEnum.both,
      available: false
    },
    {
      name: "Profile",
      route: 'profile',
      icon: 'person',
      isActive: false,
      slot: SlotEnum.both,
      available: true
    },
    {
      name: "Settings",
      route: 'settings',
      icon: 'settings',
      isActive: false,
      slot: SlotEnum.both,
      available: false
    }
  ]

  constructor(public widthService: WidthService) {
    widthService.currentWidth.subscribe(w => {
      //console.log(w)
      this.currentWindowWidth = w
    })
  }

  tabsChange(e: { tab: string }) {
    //console.log(e)
    this.tabs.forEach(o => {
      if (e.tab == o.route) {
        o.isActive = true
      } else {
        o.isActive = false
      }
    })
  }

}
