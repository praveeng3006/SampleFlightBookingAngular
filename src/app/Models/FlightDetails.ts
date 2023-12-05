import { Airlines } from "./Airlines";
import { FlightTripSchedule } from "./FlightTripSchedule";
export class FlightDetails{

    flightId!: string;
    flightNumber!: string;
    airlinesId!: Date;
    instrumentUsed!: Date;
    rowsCount!: Date;
    businessClassSeatsCount!: Date;
    nonBusinessClassSeatsCount!: string;
    SeatsAvailable!:number;
    airlineMasterModel!:Airlines;
    flightTripSchedules!:FlightTripSchedule[]
}