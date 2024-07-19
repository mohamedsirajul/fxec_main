import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/service/authentication.service';
import { SpinnerService } from 'app/service/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('buttonState', [
      transition('void => *', [
        style({ transform: 'scale(0)' }),
        animate('300ms', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  reactiveForm: FormGroup;
  form_status: boolean;
  year: number;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private spinnerService: SpinnerService,

  ) {
    this.reactiveForm = this.fb.group({
      usersname: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.form_status = false;
    this.year = new Date().getFullYear();
  }

  ngOnInit() {}

  postdata() {
    this.form_status = true;
    this.spinnerService.showSpinner();

    if (this.reactiveForm.valid) {
      const username = this.reactiveForm.value.usersname;
      const password = this.reactiveForm.value.password;

      console.log(username);

      this.authService.login(username, password).subscribe(
        (response: any) => {
          // Handle the login response
          this.authService.handleLoginResponse(response);
          console.log(response);
          this.spinnerService.hideSpinner();

          if (response.authenticated) {
            const toastConfig: Partial<IndividualConfig> = {
              timeOut: 1500,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'decreasing'
            };
            const toastRef = this.toastr.success('Login successful!', 'Success', toastConfig);
            toastRef.onHidden.subscribe(() => {
              this.router.navigate(['/dashboard']);
            });
          } else {
            const toastConfig: Partial<IndividualConfig> = {
              timeOut: 1500,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'decreasing'
            };
            this.toastr.error(response.debug, 'Error', toastConfig);
            this.spinnerService.hideSpinner();
            console.log('Authentication failed:', response.debug);
          }
          
        },
        (error: any) => {
          // Handle the login error

          this.authService.handleLoginError(error);
          const toastConfig: Partial<IndividualConfig> = {
            timeOut: 1500,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'decreasing'
          };
          const toastRef = this.toastr.error(error.message, 'Error', toastConfig);
          console.log(error);
          this.spinnerService.hideSpinner();
        }
      );

      // Reset form after submitting
      this.reactiveForm.reset();
    } else {
      // Form validation failed
      console.log('Invalid form');
      this.spinnerService.hideSpinner();
      const toastConfig: Partial<IndividualConfig> = {
        timeOut: 1500,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing'
      };
      const toastRef = this.toastr.error('Invalid Form!', 'Error', toastConfig);

    }
    this.form_status = false;
  }
}
