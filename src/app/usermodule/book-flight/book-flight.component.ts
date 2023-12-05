import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import {  FormArray,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchFlights } from 'src/app/Models/SearchFlight';
import { searchFlightService } from 'src/app/services/search-flightTrips'; 
import { FlightTripSchedule } from 'src/app/Models/FlightTripSchedule'; 
import { SharedService } from 'src/app/services/shared-service.service';
import { UserSelectedFlightsData } from 'src/app/Models/UserSelectedFlightsDetails';
import { Flightbooking } from 'src/app/Models/Flightbooking';
import { BookTicketService } from 'src/app/services/book-ticket.service';
import {UserFlightTicketData} from 'src/app/Models/UserFlightTicketData';
@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styles: [
  ]
})
export class BookFlightComponent implements OnInit {
  showBookingdetailsForm!:FormGroup;
  FlightTripSchedule!:FlightTripSchedule[];
  searchFlightsRequest:SearchFlights=new SearchFlights();
  submitted = false;
  public showAlertBox=false;
  public AlertMessage:string="Alert Message Here..";
  public DisableSaveButton=false;
  mealPrefOptions:any=['Veg','Non Veg'];
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
  public userSelectedFlightsData!:UserSelectedFlightsData;
  //public userFlightTicketData!:Flightbooking;
  public userFlightTicketData!:UserFlightTicketData;
  constructor( private searchFlightService: searchFlightService,private formBuilder: FormBuilder,private sharedService:SharedService,private bookTicketService:BookTicketService) {


   }


  ngOnInit(): void {
    
                  this.userSelectedFlightsData=this.sharedService.GetUserSelectedFlightsData();
                  console.log("bookflight component-Model",this.userSelectedFlightsData);
                   
                  this.showBookingdetailsForm= this.formBuilder.group({
                 
                          username:['',[Validators.required]],
                          userEmail:['',[Validators.required]],
                          passengerdetails:this.formBuilder.array([this.formBuilder.group({    
                            id:[''],    
                                name:[''],    
                                age:[''],    
                                mealpreference :[''],
                                pnrnumber:[''],
                                selectedseatnumber:[],
                                usermail:['']    
                          })]) 
                    });
this.createPassengerForm(this.userSelectedFlightsData.passengersCount-1);
      }

  // convenience getter for easy access to form fields
  get f() { return this.showBookingdetailsForm.controls; }




  onSubmit(buttonType:string): void {
          this.submitted = true;
          // stop here if form is invalid
          if (this.showBookingdetailsForm.invalid) {
              return;
          }
          if(buttonType==="Save") 
          {
            console.log("Save Button Clicked");
            console.log("Formgroup after filling",this.showBookingdetailsForm)
            //this.userFlightTicketData= new Flightbooking();
            //UserFlightTicketData
            this.userFlightTicketData= new UserFlightTicketData();
            this.userFlightTicketData.UserEmail= this.showBookingdetailsForm.controls.userEmail.value;
            this.userFlightTicketData.Username= this.showBookingdetailsForm.controls.username.value;
            this.userFlightTicketData.Userid="0";
            //TODO:need below property from search flights screen
           // this.userFlightTicketData.Triptype=this.userSelectedFlightsData.trip
           this.userFlightTicketData.Discountcode=""; //Need to implement later
           //this.userFlightTicketData.Selectedseatonward= this.showBookingdetailsForm.get
           this.userFlightTicketData.onwarddate = this.userSelectedFlightsData.onWardDate;
           this.userFlightTicketData.returndate= this.userSelectedFlightsData.returnDate;
           this.userFlightTicketData.Amount= this.userSelectedFlightsData.onwardAmount;
           this.userFlightTicketData.airlinename= this.userSelectedFlightsData.onwardAirlineName;
           this.userFlightTicketData.Airlinelogo= this.userSelectedFlightsData.onwardAirlineLogo;
           this.userFlightTicketData.ReturnAmount= this.userSelectedFlightsData.returnAmount;
           this.userFlightTicketData.ReturnAirlinename= this.userSelectedFlightsData.returnAirlineName;
           this.userFlightTicketData.ReturnAirlinelogo= this.userSelectedFlightsData.returnAirlineLogo;
           this.userFlightTicketData.totalamount= this.userSelectedFlightsData.totalAmount  ;
           this.userFlightTicketData.Fromplace= this.userSelectedFlightsData.fromPlace;
           this.userFlightTicketData.Toplace= this.userSelectedFlightsData.toPlace;
           //TODO : check below property
           //this.userFlightTicketData.Mealtype= this.userSelectedFlightsData.mea
           //this.userFlightTicketData.returnMealtype
           this.userFlightTicketData.Pnrnumber="0"; //it is auto generated so put dummy value
           this.userFlightTicketData.tripId=this.userSelectedFlightsData.onWardTripId;
           this.userFlightTicketData.returnTripId= this.userSelectedFlightsData.returnTripId;
           this.userFlightTicketData.Triptype= this.userSelectedFlightsData.tripType;
           let passengerFArray=this.showBookingdetailsForm.controls.passengerdetails as FormArray;
           this.userFlightTicketData.passengerdetails=[];
           for (var i = 0; i < passengerFArray.length; i++) {
             console.log("passengerArrayElement",passengerFArray.at(i).value)
            this.userFlightTicketData.passengerdetails.push(passengerFArray.at(i).value);
           }
         
           this.bookTicketService.bookUserFlightTicket(this.userFlightTicketData)
           .subscribe(x=>{
            this.AlertMessage=x.item2;
            this.showAlertBox=true;
            this.DisableSaveButton= true;
           });
            //console.log("Response message at component",responseMsg);
            // this.AlertMessage= responseMsg;
            // this.showAlertBox=true;
            // //Disable Save Button 
            // this.DisableSaveButton= true;

          //  if(responseMsg.includes('sucessfully'))
          //  {//Means Ticket Booking suucessful
          //   //Display in Page in Highlight DIV
          //   this.AlertMessage= responseMsg;
          //   this.showAlertBox=true;
          //   //Disable Save Button 
          //   this.DisableSaveButton= true;
          //   //Display Back Button
          //  }


          }
        

    } //End of Submit Method

    createPassengerForm(passengersCount:number)
    {
            let arr=[];    
        for(let i=0;i< passengersCount;i++)    
        {       
          arr.push(this.BuildFormDynamic())    
          let usersArray = this.showBookingdetailsForm.controls.passengerdetails as FormArray; 
          usersArray.insert(i,arr[i]);
        }
       

          console.log('createPassengerForm Method completed');
          //this.showBookingdetailsForm.patchValue(bdetails);
          console.log('formbuilder');
          console.log(this.showBookingdetailsForm);

    }

    get userFormGroups():FormArray {
      return this.showBookingdetailsForm.get('passengerdetails') as FormArray
      }

      BuildFormDynamic():FormGroup{    
        return this.formBuilder.group({    
          id:[],    
              name:[],    
              age:[],    
              mealpreference :[],
              pnrnumber:[],
              selectedseatnumber:[],
              usermail:[]    
         })    
       } 


                       
    
}
