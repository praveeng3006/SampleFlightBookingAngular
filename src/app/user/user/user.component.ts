import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  SearchForm!: FormGroup;
  id!: string;
  submitted = false;
  users!:User[];
  constructor(
              private userService: UserService,
              private formBuilder: FormBuilder
               ){ }

  ngOnInit(): void {
                this.SearchForm= this.formBuilder.group({
                emailid:['',[Validators.required, Validators.email]]
                })

                this.userService.getUsers().subscribe(x=>this.FillAllUsers(x));
              }

   GetUserById(id:string)
  {
//this.userService.getById(id).subscribe
  }
  onSubmit(){
                  this.submitted = true;
                  // reset alerts on submit
                  //this.alertService.clear();

                  // stop here if form is invalid
                  if (this.SearchForm.invalid) {
                      return;
                  }
                console.log('Submit fun in user triggered')
                console.log(this.SearchForm.controls.emailid.value);
                this.userService.getById(this.SearchForm.controls.emailid.value).subscribe(x=>this.fillUserDetails(x))
            }

    fillUserDetails(userDetails:User)
    {
    console.log(userDetails);
    }
    FillAllUsers(allUsers:User[])
    {
      this.users=allUsers;
      console.log(this.users);
    }
            

    // convenience getter for easy access to form fields
    get f() { return this.SearchForm.controls; }

}
