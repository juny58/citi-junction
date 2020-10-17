import { Component, OnInit } from '@angular/core';
import { WidthService } from 'src/app/services/width/width.service';
import { SearchService } from 'src/app/services/search/search.service';
import { FashionService } from './fashion.service';
import { FashionCategories } from './fashion.interface';

@Component({
  selector: 'app-fashion',
  templateUrl: './fashion.page.html',
  styleUrls: ['./fashion.page.scss'],
})
export class FashionPage implements OnInit {

  categories: Array<FashionCategories>

  constructor(public fashionService: FashionService, public widthService: WidthService, public searchService: SearchService) { }

  ngOnInit() { 
    this.getCategories()
  }

  searchTyped(v) {
    this.searchService.searchTyped()
  }

  getCategories() {
    this.categories = this.fashionService.getFashionCategories()
  }

}
