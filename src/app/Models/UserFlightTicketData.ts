import { Flightbooking } from "./Flightbooking";
//This Class is used to Book the ticket and Similar to API Class - FlightbookingDto 
//This Class will be passed to Web API Method : ReserveTicketForUser
export class UserFlightTicketData extends Flightbooking{
    tripId!: string;
    passengersCount!: number;
    returnTripId!:string;
}