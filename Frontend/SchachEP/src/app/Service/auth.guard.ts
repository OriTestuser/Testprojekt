import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserServiceService} from './user-service.service'
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RefreshGuard implements CanActivate {
  act = false;
  constructor(private router: Router, private userService: UserServiceService) {}

  activate(){
    this.act = true;
  }

  canActivate(): boolean {
    //Check if there is data storage
    //If the user refreshes, the data will disappear
    return this.act;
  }
}
