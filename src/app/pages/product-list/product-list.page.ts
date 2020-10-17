import { Component, OnInit } from '@angular/core';
import { WidthService } from 'src/app/services/width/width.service';
import { SearchService } from 'src/app/services/search/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, public widthService: WidthService, public searchService: SearchService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      console.log(data.categoryId)
    })
  }

  searchTyped(v) {}
}
