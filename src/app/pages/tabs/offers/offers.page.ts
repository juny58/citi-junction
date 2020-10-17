import { Component, OnInit } from '@angular/core';
import { WidthService } from 'src/app/services/width/width.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  constructor(public widthService: WidthService) { }

  ngOnInit() { }

}
