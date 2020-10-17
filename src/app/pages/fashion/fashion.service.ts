import { Injectable } from '@angular/core';
import { FashionCategories } from './fashion.interface';

@Injectable({
  providedIn: 'root'
})
export class FashionService {

  constructor() { }

  getFashionCategories() {
    return <Array<FashionCategories>> [
      {
        title: "Men",
        param: "men",
        icon: "assets/fashion/men.svg"
      },
      {
        title: "Women",
        param: "women",
        icon: "assets/fashion/women.svg"
      },
      {
        title: "Kids",
        param: "kids",
        icon: "assets/fashion/kids.svg"
      },
      {
        title: "Accessories",
        param: "accessories",
        icon: "assets/fashion/accessories.svg"
      },
      {
        title: "Jewellery",
        param: "jewellery",
        icon: "assets/fashion/jewellery.svg"
      }
    ]
  }
}
