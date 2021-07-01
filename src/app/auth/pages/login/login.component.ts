import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth/auth.service';
import { UserService } from '@auth/services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: FormGroup;
  constructor(public _auth: AuthService, public _user: UserService, private _route: Router) {

    this.user = new FormGroup({
      nickname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void { }

  onSubmit() {

    if (this.user.valid) {
      this._auth.loginUser(this.user.getRawValue()).subscribe(
        ({ token }) => {
          this._auth.setToken(token, false);
          this._user.update();
          this._route.navigate(['/home']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}



