import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signupForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private snackBar: MatSnackBar, private router: Router) {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      admin: [false, Validators.required]
    });
   }

  ngOnInit(): void {
  }

  register() {
    if(this.signupForm.controls.admin.value === 'true') {
      this.signupForm.controls.admin.setValue(true);
    } else {
      this.signupForm.controls.admin.setValue(false);
    }
    this.loginService.registerUser(this.signupForm.value).subscribe(response => {
      if (response.success) {
        this.openSnackBar(response.data.message, 'mat-primary');
        this.router.navigate(['/login']);

      }
    },  error => {
      this.openSnackBar(error.error.message, 'mat-warn');
    });
  }

  openSnackBar(message: string, className: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['mat-toolbar', className]
    });
  }
}
