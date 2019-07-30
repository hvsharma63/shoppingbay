import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  @Input() totalRating: number;
  fullStar = null;
  fullStarArray = [];
  halfStar = null;
  halfStarArray = [];
  starOutline = null;
  starOutlineArray = [];
  constructor() { }

  ngOnInit() {
    this.fullStar = Math.floor(this.totalRating);
    this.halfStar = Math.ceil(this.totalRating - this.fullStar);
    this.starOutline = Math.floor(5 - this.totalRating);
    for (let index = 0; index < this.fullStar; index++) {
      this.fullStarArray.push(index);
    }
    for (let index = 0; index < this.halfStar; index++) {
      this.halfStarArray.push(index);
    }
    for (let index = 0; index < this.starOutline; index++) {
      this.starOutlineArray.push(index);
    }
  }

}
