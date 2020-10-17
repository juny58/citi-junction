import { Component, OnInit } from '@angular/core';
import { WidthService } from 'src/app/services/width/width.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public widthService: WidthService) { }

  ngOnInit() { }

}
