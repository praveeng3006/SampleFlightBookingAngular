import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-mange-bookings',
  templateUrl: './mange-bookings.component.html',
  styles: [
  ]
})
export class MangeBookingsComponent implements OnInit {

  constructor(private sharedService:SharedService) { 
console.log("MangeBookingConstructor-Model is",sharedService.GetUserSelectedFlightsData());

  }

  ngOnInit(): void {
  }

}
