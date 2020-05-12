import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FoodTrucksService } from './_services/food-trucks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /** Initialization of required variables */ 
  title = 'show-open-food-trucks';
  private subscription; // Observable variable
  clock = new Date(); // clock variable to get current Time.
  foodTrucksList: any = {}; // object where data response from API will be saved.
  openFoodTrucks: any = []; // array of objects for open Food Trucks once are filtered by day and time.
  page: number = 1; // initialization of page number once loaded

  constructor(
    private route: ActivatedRoute,
    private foodTrucksService: FoodTrucksService
  ) {}

  /** Lifecycle function of initialization  */
  ngOnInit(): void {
    /** Function that will display the clock on page every second */
    setInterval(() => {
      this.clock = new Date();
    }, 1000);

    /** Observable to fetch data from API and save it into "this.foodTrucksList" */
    this.subscription = this.route.paramMap.subscribe(params => {
      this.foodTrucksService
        .getFoodTrucks()
        .subscribe(
          data => {
            this.foodTrucksList = data;
          },
          error => {
            throw(error);
          });
    });
  }

  /** Function to slice property value from API,
   * and parse it into a number value for performance.
   */
  getHourTime(hour: string) {
    let value = hour.slice(0, 2);
    return parseInt(value);
  }

  /** Sort open food trucks based on name property */
  sortOpenFoodTrucks(openFoodTrucks): void {
    this.openFoodTrucks.sort((a, b) => a.applicant.localeCompare(b.applicant));
  }

  /** Function that will display the open Food Trucks based on day of week and current time. */
  showOpenFoodTrucks() {
    /** Initializing array of objects to store open Food Trucks, 
     *  as well as the day of the week (dayOrder),
     *  and current Hour (currentHour) */ 
    this.openFoodTrucks = [];
    let dayOrder = this.clock.getDay();
    let currentHour = this.clock.getHours();

    /** Iterate through the list of Food Trucks from API */
    for(let item in this.foodTrucksList) {
      // Parse string value property from API to number variable (dayOrderAPI) for performance
      let dayOrderAPI = parseInt(this.foodTrucksList[item].dayorder);
      
      // Compare current day of the week vs parsed number variable
      if(dayOrder === dayOrderAPI) {
        // Getting property values of food trucks opening and closing times.
        let startTime = this.getHourTime(this.foodTrucksList[item].start24);
        let endTime = this.getHourTime(this.foodTrucksList[item].end24);

        // Filtering list of food trucks that are open based on current time
        if(startTime <= currentHour && currentHour <= endTime) {
          this.openFoodTrucks.push(this.foodTrucksList[item]);
        }
      }
    }

    // Calling function to sort items
    this.sortOpenFoodTrucks(this.openFoodTrucks);
  }
}