import { Component } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { PointsService } from './services/points.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bowling-opgave';

  data: { points: [], token: string };
  frames: number[][];
  points: number[] = [];
  response: string;

  constructor(private pointsService: PointsService) { }

  ngOnInit() {

  }

  newGame() {
    this.pointsService.getPoints().subscribe(
      (data) => {
        this.frames = data.points;
        let token = data.token;

        this.points = this.calculateScore(data.points)

        this.pointsService.postPoints(this.points, token).subscribe(
          (data : {success: string, input: []}) => {
            if (data.success) {
              this.response = 'Score was validated successfully by server';
            } else {
              this.response = 'Score was NOT validated successfully by server';
            }
          }
        )
      }
    )
  }

  isStrike(frame: number[]) {
    return frame[0] == 10;
  }

  isSpare(frame: number[]) {
    return (frame[0] != 10 && (frame[0] + frame[1] == 10));
  }

  calculateSum(frame: number[]) {
    return frame.reduce(function (a, b) { return a + b; }, 0);
  }

  calculateBonus(frames, index) {
    let bonus = 0;

    let frame = frames[index];
    if (this.isStrike(frame)) {
      if (index == 10) {
        bonus = frames[index][1];
      } else if (frames[index + 1] != null) {
        bonus = frames[index + 1][0];

        if (frames[index + 1][0] == 10 && frames[index + 2] != null) {
          bonus += frames[index + 2][0]
        } else {
          bonus += frames[index + 1][1]
        }
      }
    } else if (this.isSpare(frame)) {
      if (frames[index + 1] != null) {
        bonus = frames[index + 1][0];
      }
    }

    return bonus;
  }

  calculateScore(frames) {
    var score: number = 0;
    var points: number[] = [];
    var bonus: number = 0;

    for (let i = 0; i < frames.length; i++) {
      if(i >= 10) break;
      
      bonus = 0;

      const frame: number[] = frames[i];

      bonus = this.calculateBonus(frames, i);
      score += this.calculateSum(frame) + bonus;

      points.push(score);
    }

    return points;
  }
}
