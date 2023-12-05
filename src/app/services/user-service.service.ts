import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
const baseUrl = `http://localhost:54451/api/admin`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getById(id: string) {
    return this.http.get<User>(`${baseUrl}/userDetails/${id}`);
}
getUsers()
{
  return this.http.get<User[]>(`${baseUrl}/users`);
}
getUserDetailsById(id: string){
  return this.http.get<User>(`${baseUrl}/user/${id}`);

}

}
