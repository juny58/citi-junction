import { Component, OnInit } from '@angular/core';
import { WidthService } from 'src/app/services/width/width.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public widthService: WidthService) { }

  ngOnInit() { }

}
