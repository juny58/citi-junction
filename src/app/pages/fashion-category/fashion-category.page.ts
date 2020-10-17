import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-fashion-category',
  templateUrl: './fashion-category.page.html',
  styleUrls: ['./fashion-category.page.scss'],
})
export class FashionCategoryPage implements OnInit {

  constructor(public searchService: SearchService) { }

  ngOnInit() { }

  searchTyped(v) {}

}
