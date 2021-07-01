import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth/auth.service';
import { UserService } from '@auth/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public _user: UserService,
    public _auth: AuthService,
    public _router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut(): void{
    this._auth.logoutUser()
    this._user.destroy()
    console.log("amonos alv!");
    
  }
}
