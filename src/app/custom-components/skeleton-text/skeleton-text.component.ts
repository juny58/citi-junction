import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-text',
  templateUrl: './skeleton-text.component.html',
  styleUrls: ['./skeleton-text.component.scss'],
})
export class SkeletonTextComponent implements OnInit {

  @Input() skeletonRows = 7
  rows = []

  constructor() { }

  ngOnInit() {
    this.rows = new Array(this.skeletonRows)
  }

}
