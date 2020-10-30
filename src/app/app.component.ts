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

  testData: { points: [], token: string } = JSON.parse('{"points":[[1,7],[9,0],[9,1],[6,1],[6,1],[3,5],[8,0],[1,6],[9,1,1]],"token":"MMGWic7bgGffVlzLnlue2gEhXf3FUz8y"}');
  //frames: number[][] = this.testData.points;
  //points: number[] = [8,17,33,40,47,55,63,70,80];
  //testData: { points: [], token: string } = JSON.parse('{"points":[[8,0],[9,1],[1,7],[6,1],[3,2],[0,2],[10,0],[4,5],[0,10],[5,3]],"token":"OfSfefnU3J9HQBj1T7sZ6f4dds17gurl"}');
  data: { points: [], token: string };
  frames: number[][];
  points: number[] = [];

  constructor(private pointsService: PointsService) { }

  ngOnInit() {

  }

  newGame() {
    /*let data = this.pointsService.getPoints();
    this.frames = data.points;
    this.calculateScore(this.frames)*/

    this.pointsService.getPoints().subscribe(
      (data) => {
        this.frames = data.points;
        let token = data.token;
        this.points = this.calculateScore(data.points)

        this.pointsService.postPoints(this.points, token).subscribe(
          (data) => {
            console.log(data)
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
      if (frames[index + 1] != null) {
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

    console.log(frames);

    for (let i = 0; i < frames.length; i++) {
      bonus = 0;

      const frame: number[] = frames[i];

      bonus = this.calculateBonus(frames, i);
      score += this.calculateSum(frame) + bonus;

      points.push(score);
    }

    /*console.log('Calculated');
    console.log(points)
    console.log('Correct');
    //console.log([8,17,33,40,47,55,63,70,80])
    console.log([8,19,27,34,39,41,60,69,84,92])*/
    return points;
    //console.log(frames)
  }
}
