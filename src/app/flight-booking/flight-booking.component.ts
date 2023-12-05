import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { first } from 'rxjs/operators';
import { Flightbooking } from '../Models/Flightbooking';
import { BookingHistoryService } from '../services/booking-history.service';
@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css']
})
export class FlightBookingComponent implements OnInit {
  SearchBookingForm!: FormGroup;
  flightBookings!:Flightbooking[];
  submitted = false;
  
  constructor( private bookingHistoryService: BookingHistoryService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
                    this.SearchBookingForm= this.formBuilder.group({
                      emailid:['',[Validators.required, Validators.email]]
                      })
                      this.bookingHistoryService.getFlightBookingHistory()
                                        .subscribe(x=>this.FillFlightBookingDetailsByEmailId(x))
                    }
    // convenience getter for easy access to form fields
    get f() { return this.SearchBookingForm.controls; }
    onSubmit(){
                this.submitted = true;
                // stop here if form is invalid
                if (this.SearchBookingForm.invalid) {
                    return;
                }
              console.log('Submit fun in user triggered')
              console.log(this.SearchBookingForm.controls.emailid.value);
              this.bookingHistoryService.getBookingDetailsByEmailId(this.SearchBookingForm.controls.emailid.value)
                                        .subscribe(x=>this.FillFlightBookingDetailsByEmailId(x))
              }
    FillFlightBookingDetailsByEmailId(fBookings:Flightbooking[])
    {
      this.flightBookings=fBookings;
      console.log(this.flightBookings);
    }

}
