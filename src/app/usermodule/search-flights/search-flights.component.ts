import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchFlights } from 'src/app/Models/SearchFlight';
import { searchFlightService } from 'src/app/services/search-flightTrips'; 
import { FlightTripSchedule } from 'src/app/Models/FlightTripSchedule'; 
import { UserSelectedFlightsData } from 'src/app/Models/UserSelectedFlightsDetails';
import { SharedService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styles: [
  ]
})
export class SearchFlightsComponent implements OnInit {
  searchFlightsForm!:FormGroup;
  FlightTripSchedule!:FlightTripSchedule[];
  searchFlightsRequest:SearchFlights=new SearchFlights();
  submitted = false;
  public onwardAmount:number=0;
  public returnAmount:number=0;
  public totalAmount:number=0;
  public passengersCount:number=1;
  public ishidden=false;
  public selectedFromPlace:string="";
  public selectedToPlace:string="";
  public selectedFlightDate!:Date;
  public selectedtripType:string="";
  public selectedReturnDate!:Date;
  public selectedTripId:string="";
  public selectedReturnTripId:string="";
  public selectedOnwardStartTime!:Date;
  public selectedOnwardEndTime!:Date;
  public selectedReturnStartTime!:Date;
  public selectedReturnEndTime!:Date;
  public selectedOnWardFlightNumber:string="";
  public selectedReturnFlightNumber:string="";
  public selectedOnwardAirlineName:string="";
  public selectedOnwardAirlineLogo:string="";
  public selectedReturnAirlineName:string="";
  public selectedReturnAirlineLogo:string="";

  constructor( private searchFlightService: searchFlightService,private formBuilder: FormBuilder,private sharedService:SharedService,private router:Router) { }

  ngOnInit(): void {

    this.searchFlightsForm= this.formBuilder.group({
     FromPlace:['Hyderabad',[Validators.required]],
     ToPlace:['Tirupathi',[Validators.required]],
     AvailableDate:['2021-07-01',[Validators.required]],
     returnDateTime:['2021-07-02',[Validators.required]],
     StartDateTime:['07/01/2021 7:03:17 AM',[Validators.required]],
     EndDateTime:['07/01/2021 7:03:17 AM',[Validators.required]],
     TripType:['oneway'],
     PassengersCount:['1']
     })
}

  // convenience getter for easy access to form fields
  get f() { return this.searchFlightsForm.controls; }


  onSubmit(buttonType:string): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.searchFlightsForm.invalid) {
        return;
    }
    if(buttonType==="Search") 
    {
      console.log("Search Button Clicked");
          //console.log('Submit fun in user triggered')
    //console.log(this.searchFlightsForm);
    this.searchFlightsRequest.FromPlace=this.searchFlightsForm.controls.FromPlace.value;
    this.searchFlightsRequest.ToPlace=this.searchFlightsForm.controls.ToPlace.value;
    this.searchFlightsRequest.AvailableDate=this.searchFlightsForm.controls.AvailableDate.value;
    this.searchFlightsRequest.returnDateTime=this.searchFlightsForm.controls.returnDateTime.value;
    this.searchFlightsRequest.StartDateTime=this.searchFlightsForm.controls.StartDateTime.value;
    this.searchFlightsRequest.EndDateTime=this.searchFlightsForm.controls.EndDateTime.value;
    this.searchFlightsRequest.TripType=this.searchFlightsForm.controls.TripType.value;
    //Call Service to Search Flights
    this.searchFlightService.SearchFlightTrips(this.searchFlightsRequest)
                                  .subscribe(x=>this.DispalyAvailableFlights(x));
    //Show in User Selected details in the Box
    //this.selectedFromPlace=this.searchFlightsForm.controls.FromPlace.value;
   // this.selectedToPlace=this.searchFlightsForm.controls.ToPlace.value;
    this.selectedtripType=this.searchFlightsForm.controls.TripType.value;
    //this.selectedFlightDate= this.searchFlightsForm.controls.AvailableDate.value;
    //this.selectedReturnDate=this.searchFlightsForm.controls.returnDateTime.value;

    //refresh Calculations
    this.totalAmount=0;
    this.onwardAmount=0;
    this.returnAmount=0;
  }
if(buttonType==="BookTicket"){
        console.log("BookTicket Button Clicked");
        let uSFD= new UserSelectedFlightsData();
        uSFD.onWardTripId=this.selectedTripId;
        uSFD.returnTripId=this.selectedReturnTripId;
        uSFD.fromPlace=this.selectedFromPlace;
        uSFD.toPlace=this.selectedToPlace;
        uSFD.onWardDate=this.selectedFlightDate;
        uSFD.returnDate=this.selectedReturnDate;
        uSFD.totalAmount=this.totalAmount;
        uSFD.onwardAmount=this.onwardAmount;
        uSFD.returnAmount=this.returnAmount;
        uSFD.passengersCount=this.passengersCount;
        uSFD.OnwardStartTime=this.selectedOnwardStartTime;
        uSFD.OnwardEndTime=this.selectedOnwardEndTime;
        uSFD.ReturnStartTime=this.selectedReturnStartTime;
        uSFD.ReturnEndTime=this.selectedReturnEndTime;
        uSFD.onWardFlightNumber=this.selectedOnWardFlightNumber;
        uSFD.returnFlightNumber=this.selectedReturnFlightNumber;
        uSFD.onwardAirlineName=this.selectedOnwardAirlineName;
        uSFD.onwardAirlineLogo=this.selectedOnwardAirlineLogo;
        uSFD.returnAirlineName=this.selectedReturnAirlineName;
        uSFD.returnAirlineLogo=this.selectedReturnAirlineLogo;
        uSFD.tripType=this.searchFlightsForm.controls.TripType.value;
        this.sharedService.SetUserSelectedFlightsData(uSFD);
        this.router.navigateByUrl('/BookFlight');
        }

} //End of Submit Method


DispalyAvailableFlights(flightTripSchedulerResponse:FlightTripSchedule[])
    {
      console.log('Data at the DispalyAvailableFlights method:')
      console.log(flightTripSchedulerResponse);
      this.FlightTripSchedule= flightTripSchedulerResponse;
    }

    onwardRadioButtonChanged(event:any){
      //This method to calculate amount because ngModel converts number to string hence experession {{onwardAmount+returnAmount}} not doing the sum
     console.log(" onwardRadioButtonChanged Value is : ", event.target.value);
     this.onwardAmount=+event.target.value * this.searchFlightsForm.controls.PassengersCount.value;
     this.passengersCount=this.searchFlightsForm.controls.PassengersCount.value;
     this.totalAmount=+this.returnAmount+this.onwardAmount;
    // this.CalculateTotalAmount();
    
     }

     returnRadioButtonChanged(event:any){
      //This method to calculate amount because ngModel converts number to string hence experession {{onwardAmount+returnAmount}} not doing the sum
    
    //console.log(" return Value is : ", event.target.value );
    this.returnAmount=+event.target.value * this.searchFlightsForm.controls.PassengersCount.value;
    this.passengersCount=this.searchFlightsForm.controls.PassengersCount.value;
    this.totalAmount=+this.returnAmount+this.onwardAmount;
    //this.CalculateTotalAmount();
    }

    getAvailableFlightsByType(trptype:string):FlightTripSchedule[]{

      if(this.FlightTripSchedule){
        return this.FlightTripSchedule.filter(f=>f.tripType ==trptype);  
      }
      return this.FlightTripSchedule;
    }

    radioButtonChanged(event:any){
      let radioValue = event.target.value;
          if(radioValue =="roundtrip"){
            this.ishidden = true;
          }else{
            this.ishidden = false;
          }
      }
  
      SelectedFlight(item:FlightTripSchedule){
        console.log(" SelectedFlight Method-TripId : ", item.tripId );
        this.selectedTripId=item.tripId;
        this.selectedOnwardStartTime=item.startDateTime;
        this.selectedOnwardEndTime=item.endDateTime;
        this.selectedFromPlace=item.fromPlace;
        this.selectedToPlace=item.toPlace;
        this.selectedFlightDate= item.availableDate;
        this.selectedOnWardFlightNumber=item.flight.flightNumber;
        this.selectedOnwardAirlineName=item.flight.airlineMasterModel.airlineName;
        this.selectedOnwardAirlineLogo=item.flight.airlineMasterModel.airlineLogo;
        }
        
        
      SelectedReturnFlight(item:FlightTripSchedule){
          console.log(" SelectedReturnFlight Method-TripId : ", item.tripId );
          this.selectedReturnTripId=item.tripId;
          this.selectedReturnDate= item.availableDate;
          this.selectedReturnStartTime=item.startDateTime;
          this.selectedReturnEndTime=item.endDateTime;
          this.selectedReturnFlightNumber=item.flight.flightNumber;
          this.selectedReturnAirlineName=item.flight.airlineMasterModel.airlineName;
          this.selectedReturnAirlineLogo=item.flight.airlineMasterModel.airlineLogo;
          }


} //End of the Component Class
