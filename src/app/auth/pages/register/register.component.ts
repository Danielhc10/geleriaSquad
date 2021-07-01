import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AuthService } from '@auth/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  confirme: FormControl;
  constructor() {
    this.register = new FormGroup({
      nickname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.confirme = new FormControl('')
   }

  ngOnInit(): void {
  }
  passConfirmed(): boolean {
    return this.confirme.touched && this.register.get('password').value == this.confirme.value && this.confirme.valid;
  }


}
