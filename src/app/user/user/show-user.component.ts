import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
userId!:string;
showUserForm!:FormGroup;

  constructor(private route: ActivatedRoute,private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
                      this.userId=this.route.snapshot.params['id'];
                      this.showUserForm= this.formBuilder.group({
                        userID:[''],
                        password:[''],
                        role:[''],
                        username:[''],
                        userEmail:['']
                        });
                      this.userService.getUserDetailsById(this.userId).subscribe(x=>this.showUserForm.patchValue(x));

                    }

}
