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
  }

  postPoints(points,token) {
    let json = { "token": token, "points": points }
    return this.http.post('http://13.74.31.101/api/points',json)
  }
}
