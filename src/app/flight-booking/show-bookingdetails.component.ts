import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { first } from 'rxjs/operators';
import { Flightbooking } from '../Models/Flightbooking';
import { BookingHistoryService } from '../services/booking-history.service';
import { passengerdetails } from '../Models/passengerdetails';
@Component({
  selector: 'app-show-bookingdetails',
  templateUrl: './show-bookingdetails.component.html',
  styleUrls: ['./show-bookingdetails.component.css']
})
export class ShowBookingdetailsComponent implements OnInit {
  flightBookingId!:string;
  showBookingdetailsForm!:FormGroup;
 
  showBookingdetailsData!:Flightbooking;
  constructor( private route: ActivatedRoute,private bookingHistoryService: BookingHistoryService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
                    this.flightBookingId=this.route.snapshot.params['id'];
                    this.showBookingdetailsForm= this.formBuilder.group({
                      username:[''],
                      userEmail:[''],
                      triptype:[''],
                      discountcode:[''],
                      selectedseatonward:[''],
                      selectedseatreturn:[''],
                      onwarddate:[''],
                      returndate:[''],
                      amount:[''],
                      airlinename:[''],
                      airlinelogo:[''],
                      returnAmount:[''],
                      returnAirlinename:[''],
                      returnAirlinelogo:[''],
                      totalamount:[''],
                      status:[''] ,
                      fromplace:[''] ,
                      toplace:[''] ,
                      mealtype:[''] ,
                      returnMealtype:[''] ,
                      pnrnumber:[''] ,
                      bookeddate:[''] ,
                      numberofseats:['']
                      ,
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
                    
                   // this.bookingHistoryService.getFlightBookingDetailsById(this.flightBookingId).subscribe(x=>this.showBookingdetailsForm.patchValue(x));
                   this.bookingHistoryService.getFlightBookingDetailsById(this.flightBookingId).subscribe(x=>{this.showBookingdetailsData=x;this.createPassengerForm(this.showBookingdetailsData);});
                  
                  }

    createPassengerForm(bdetails:Flightbooking)
    {
            let arr=[];    
        for(let i=0;i< bdetails.passengerdetails.length;i++)    
        {       
          arr.push(this.BuildFormDynamic(bdetails.passengerdetails[i]))    
          let usersArray = this.showBookingdetailsForm.controls.passengerdetails as FormArray; 
          usersArray.insert(i,arr[i]);
        }
       

          console.log('createPassengerForm modelaaa');
          console.log(bdetails);
          this.showBookingdetailsForm.patchValue(bdetails);
console.log('formbuilder');
console.log(this.showBookingdetailsForm);

    }
    
    BuildFormDynamic(passengerdetails:passengerdetails):FormGroup{    
      return this.formBuilder.group({    
        id:[passengerdetails.id],    
            name:[passengerdetails.name],    
            age:[passengerdetails.age],    
            mealpreference :[passengerdetails.mealpreference],
            pnrnumber:[passengerdetails.pnrnumber],
            selectedseatnumber:[passengerdetails.selectedseatnumber],
            usermail:[passengerdetails.usermail]    
       })    
     } 
     
     get userFormGroups():FormArray {
      return this.showBookingdetailsForm.get('passengerdetails') as FormArray
    }

}
