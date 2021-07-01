import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShippingsService } from '@principal/services/shippings/shippings.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  confirme: FormControl;

  constructor(
    private _router: Router,
    private _shipping: ShippingsService,
  ) {
    this.register = new FormGroup({
      nickname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.confirme = new FormControl('', Validators.required)
  }

  ngOnInit(): void {
  }

  isInvalid(): boolean {
    return this.confirme.touched &&
      this.register.get('password').value !== this.confirme.value &&
      this.register.get('password').valid &&
      this.confirme.valid;
  }

  isValid(): boolean {
    return this.confirme.touched &&
      this.register.get('password').value === this.confirme.value &&
      this.register.get('password').valid &&
      this.confirme.valid;
  }

  onSubmit(): void {
    if (this.register.valid && this.confirme.valid && this.register.get('password').value === this.confirme.value) {
      this._shipping.sendUser(this.register.getRawValue()).subscribe(() => {
        this._router.navigate(['/auth/login']);
      }, err => {
        console.log(err);
      });
    }
  }
}
