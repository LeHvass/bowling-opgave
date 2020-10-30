import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private http: HttpClient) { }

  getPoints(): Observable<any> {
    return this.http.get('http://13.74.31.101/api/points');

    //return JSON.parse('{"points":[[8,0],[9,1],[1,7],[6,1],[3,2],[0,2],[10,0],[4,5],[0,10],[5,3]],"token":"OfSfefnU3J9HQBj1T7sZ6f4dds17gurl"}');

  }

  postPoints(points,token) {
    let json = { "token": token, "points": points }
    return this.http.post('http://13.74.31.101/api/points',json)
    
  }
}
