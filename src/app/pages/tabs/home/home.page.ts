import { Component, OnInit } from '@angular/core';
import { MenuItem } from './home.interface';
import { WidthService } from 'src/app/services/width/width.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  menuItems: Array<MenuItem> = [
    {
      name: "Order Food",
      active: true,
      path: "/restaurants",
      icon: "assets/home-icons/delivery.svg"
    },
    {
      name: "Vegetables",
      active: false,
      path: "/product-list/vegetables",
      icon: "assets/home-icons/vegetable.svg"
    },
    {
      name: "Fruits",
      active: false,
      path: "/product-list/fruits",
      icon: "assets/home-icons/fruit.svg"
    },
    {
      name: "Meat",
      active: false,
      path: "/product-list/meat",
      icon: "assets/home-icons/meat.svg"
    },
    {
      name: "Fish",
      active: false,
      path: "/product-list/fish",
      icon: "assets/home-icons/fish.svg"
    },
    {
      name: "Grocery",
      active: false,
      path: "/product-list/grocery",
      icon: "assets/home-icons/grocery.svg"
    },
    {
      name: "Fashion",
      active: false,
      path: "/fashion",
      icon: "assets/home-icons/dress.svg"
    },
    {
      name: "Electronins",
      active: false,
      path: "/product-list/electronics",
      icon: "assets/home-icons/speaker.svg"
    },
    {
      name: "Services",
      active: false,
      path: "",
      icon: "assets/home-icons/support.svg",
      info: "Get varities of services from various categories"
    },
    {
      name: "Home Care",
      active: false,
      path: "/product-list/home-care",
      icon: "assets/home-icons/bed.svg"
    },
    {
      name: "Book Toto",
      active: false,
      path: "",
      icon: "assets/home-icons/car.svg",
      info: "Book a toto for a short trip within town."
    },
    {
      name: "Train time",
      active: false,
      path: "",
      icon: "assets/home-icons/train.svg",
      info: "See updated train time for the trains passes through your town."
    }
  ]

  width: number = window.innerWidth

  constructor(public widthService: WidthService, public searchService: SearchService) { }

  ngOnInit() {
    this.widthService.currentWidth.subscribe(w => {
      this.width = w
    })
  }

  searchTyped(v) {
    this.searchService.searchTyped()
  }

}
