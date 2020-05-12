import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodTrucksService {

  constructor(private http: HttpClient) { }

  getFoodTrucks() {
    return this
      .http
      .get(`https://data.sfgov.org/resource/jjew-r69b.json`);
  }
}
