import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
import { Flightbooking } from '../Models/Flightbooking';
const baseUrl = `http://localhost:54451/api/booking`;

@Injectable({
  providedIn: 'root'
})
export class BookingHistoryService {

  constructor(private http: HttpClient) { }

  getBookingDetailsByEmailId(id: string){
    return this.http.get<Flightbooking[]>(`${baseUrl}/history/?emailid=${id}`);
  
  }
  getFlightBookingDetailsById(id: string){
    return this.http.get<Flightbooking>(`${baseUrl}/FlightBookingDetails/${id}`);
  
  }
  getFlightBookingHistory(){
    return this.http.get<Flightbooking[]>(`${baseUrl}/FlightBookingHistory/`);
  
  }

  
}
