import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flightbooking } from '../Models/Flightbooking';
import { UserFlightTicketData} from '../Models/UserFlightTicketData'

const baseUrl = `http://localhost:54451/api/booking`;
@Injectable({
  providedIn: 'root'
})
export class BookTicketService {
public responseMessage:string="";
  constructor(private http: HttpClient) { }
  bookUserFlightTicket(flightbooking: UserFlightTicketData){
    //return this.http.get<Flightbooking[]>(`${baseUrl}/history/?emailid=${id}`);
    console.log("BookTicketService.bookUserFlightTicket",flightbooking);
     return this.http.post<any>(`${baseUrl}/ReserveTicketForUser`,flightbooking);
    // .subscribe(data=>{console.log("serviceResponse",data);this.responseMessage=data.item2;}
    //           );

    
  }

}
