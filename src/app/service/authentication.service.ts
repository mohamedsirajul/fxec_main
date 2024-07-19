import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedIn = false;

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    // const url = 'https://whitelms.com/billing/billingbackend/users/auth.php';
    const url = 'https://zenanvibe.com/sirraji_billing/auth_user/auth.php';

    const requestBody = {
      username: username,
      password: password
    };

    let logindata = JSON.stringify(requestBody);
    console.log(logindata);

    // Return the observable from the POST request
    return this.http.post(url, logindata);
  }

  handleLoginResponse(response: any): void {
    if (response.authenticated) {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', response['mobile/email']);
      localStorage.setItem('name', response.name);
      this.router.navigate(['/sales']);
    } else {
      console.log('Authentication failed:', response.debug);
    }
  }

  handleLoginError(error: any): void {
    console.log('Error:', error);
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
