import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'a19bf91f445250acedad9fbfbeeabb10';
  constructor(private _http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this._http.get(`${environment._api}/api/user/weather/${city}`);
  }
  getForecast(city: string): Observable<any> {
    return this._http.get(`${environment._api}/api/user/forecast/${city}`);
  }
  
}
