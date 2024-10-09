import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;
  forecastData: any[] = []; // To store forecast data
  weatherIcon: string = '';
  backgroundImage: string = '';
  weatherImage: string = '';

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.weatherData = data;
        this.setWeatherIconAndImage(this.weatherData.weather[0].main);
        this.getForecast(); // Call method to get the forecast data
      },
      (error) => {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please check the city name and try again.'); // Provide user feedback
      }
    );
  }

  getForecast() {
    this.weatherService.getForecast(this.city).subscribe(
      (data) => {
        this.forecastData = data.list.map((item: any) => ({
          date: item.dt * 1000, // Convert to milliseconds for date
          temp: {
            day: item.main.temp // Ensure this path is correct based on your API response
          },
          weather: item.weather
        }));
        
      },
      (error) => {
        console.error('Error fetching forecast data:', error);
      }
    );
  }
  
  getFormattedTime(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
  }
  
  setWeatherIconAndImage(condition: string) {
    switch (condition.toLowerCase()) {
      case 'clear':
        this.weatherIcon = 'fas fa-sun';
        this.backgroundImage = 'url("https://cdn.pixabay.com/photo/2016/03/09/09/17/sunrise-1246008_1280.jpg")';
        this.weatherImage = 'https://cdn-icons-png.flaticon.com/512/869/869869.png';
        break;
      case 'clouds':
        this.weatherIcon = 'fas fa-cloud';
        this.backgroundImage = 'url("https://cdn.pixabay.com/photo/2016/01/09/18/32/sun-1131087_1280.jpg")';
        this.weatherImage = 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png';
        break;
      case 'rain':
        this.weatherIcon = 'fas fa-cloud-rain';
        this.backgroundImage = 'url("https://cdn.pixabay.com/photo/2017/09/02/19/11/drops-2704747_1280.jpg")';
        this.weatherImage = 'https://cdn-icons-png.flaticon.com/512/3313/3313971.png';
        break;
      case 'snow':
        this.weatherIcon = 'fas fa-snowflake';
        this.backgroundImage = 'url("https://cdn.pixabay.com/photo/2016/02/13/12/26/winter-1190729_1280.jpg")';
        this.weatherImage = 'https://cdn-icons-png.flaticon.com/512/642/642116.png';
        break;
      default:
        this.weatherIcon = 'fas fa-question-circle';
        this.backgroundImage = 'url("https://cdn.pixabay.com/photo/2015/09/18/21/54/camping-950228_1280.jpg")';
        this.weatherImage = 'https://cdn-icons-png.flaticon.com/512/1031/1031452.png';
    }
  }

  getWeatherIcon(condition: string) {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'fas fa-sun';
      case 'clouds':
        return 'fas fa-cloud';
      case 'rain':
        return 'fas fa-cloud-rain';
      case 'snow':
        return 'fas fa-snowflake';
      default:
        return 'fas fa-question-circle';
    }
  }
}