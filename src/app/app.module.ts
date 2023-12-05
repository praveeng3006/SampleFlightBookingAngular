import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule ,Routes} from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import {CreateemployeeComponent} from './employees/createemployee.component';
import { UserComponent } from './user/user/user.component'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ShowUserComponent } from './user/user/show-user.component';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';
import { ShowBookingdetailsComponent } from './flight-booking/show-bookingdetails.component';
import { TopnaComponent } from './mastertheme/topna/topna.component';
import { AsidenavComponent } from './mastertheme/asidenav/asidenav.component';
import { FooterComponent } from './mastertheme/footer/footer.component';
import { DashboardComponent } from './usermodule/dashboard/dashboard.component';
import { MangeBookingsComponent } from './usermodule/mange-bookings/mange-bookings.component';
import { BookFlightComponent } from './usermodule/book-flight/book-flight.component';
import { ManageSchedulesComponent } from './adminmodule/manage-schedules/manage-schedules.component';
import { ManageDiscountsComponent } from './adminmodule/manage-discounts/manage-discounts.component';
import { ManageAirlinesComponent } from './adminmodule/manage-airlines/manage-airlines.component';
import { SearchFlightsComponent } from './usermodule/search-flights/search-flights.component';


const appRoutes:Routes=[
  {path:'list',component:ListEmployeesComponent},
  {path:'create',component:CreateemployeeComponent},
  {path:'User',component:UserComponent},
  {path:'User/ShowUser/:id',component:ShowUserComponent},
  {path:'DashBoard',component:DashboardComponent},
  {path:'FlightBookingHistory',component:FlightBookingComponent},
  {path:'BookFlight',component:BookFlightComponent},
  {path:'ManageBookings',component:MangeBookingsComponent},
  {path:'FlightBookingHistory/ShowBookingDetails/:id',component:ShowBookingdetailsComponent},
  {path:'ManageSchedules',component:ManageSchedulesComponent},
  {path:'ManageDiscounts',component:ManageDiscountsComponent},
  {path:'ManageAirlines',component:ManageAirlinesComponent},
  {path:'SearchFlights',component:SearchFlightsComponent},
  {path:'',redirectTo:'/DashBoard',pathMatch:'full'}
 
]

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateemployeeComponent,
    UserComponent,
    ShowUserComponent,
    FlightBookingComponent,
    ShowBookingdetailsComponent,
    TopnaComponent,
    AsidenavComponent,
    FooterComponent,
    DashboardComponent,
    MangeBookingsComponent,
    BookFlightComponent,
    ManageSchedulesComponent,
    ManageDiscountsComponent,
    ManageAirlinesComponent,
    SearchFlightsComponent
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
