import { FlightDetails } from "./FlightDetails";

export class FlightTripSchedule {
    
    tripId!: string;
    fromPlace!: string;
    toPlace!: string;
    availableDate!: Date;
    startDateTime!: Date;
    endDateTime!: Date;
    tripType!: string;
    seatsAvailable!:number;
    flightId!:number;
    flight!:FlightDetails
    costPerSeat:number=0;
}