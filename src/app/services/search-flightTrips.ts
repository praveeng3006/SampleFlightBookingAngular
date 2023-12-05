import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { SearchFlights } from '../Models/SearchFlight';
import { FlightTripSchedule } from '../Models/FlightTripSchedule';
// import { DatePipe } from '@angular/common'
const baseUrl = `http://localhost:54451/api/search`;
@Injectable({
    providedIn: 'root'
  })
  export class searchFlightService {

    constructor(private http: HttpClient) { }
  
    SearchFlightTrips(SearchFlight: SearchFlights){
     /*let inputParams = new HttpParams()
    .set('FromPlace', SearchFlight.FromPlace)
    .set('ToPlace', 'Tirupathi')
    .set('AvailableDate', '7/1/2021 7:03:17 AM')
    .set('returnDateTime', '7/1/2021 7:03:17 AM')
    .set('StartDateTime', '7/1/2021 7:03:17 AM')
    .set('EndDateTime', '7/1/2021 7:03:17 AM')
    .set('TripType', 'return')
    ;
    */
console.log( SearchFlight.AvailableDate);
let availableDate = new Date(SearchFlight.AvailableDate);
let returnDateTime = new Date(SearchFlight.returnDateTime);
let StartDateTime = new Date(SearchFlight.StartDateTime);
let EndDateTime = new Date(SearchFlight.EndDateTime);
console.log(availableDate);

    let inputParams = new HttpParams()
    .set('FromPlace', SearchFlight.FromPlace)
    .set('ToPlace', SearchFlight.ToPlace)
    .set('AvailableDate',availableDate.toDateString()) //TODO ::Convert to datetime
    .set('returnDateTime', returnDateTime.toDateString())
    .set('StartDateTime', StartDateTime.toDateString())
    .set('EndDateTime', EndDateTime.toDateString())
    .set('TripType', SearchFlight.TripType)
    ;
      return this.http.get<FlightTripSchedule[]>(`${baseUrl}/SearchFlightTrips`,{params: inputParams});
    
    }
    
  
    
  }