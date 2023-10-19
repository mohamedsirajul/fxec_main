import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatapassService {


	PHP_USER_SERVER = "https://zenanvibe.com/sirraji_billing/auth_user";

	private apiUrl = 'http://127.0.0.1:5000/api/generate-response'; // Replace with your backend API URL


  constructor(private httpClient: HttpClient) {}

	// store_user_data(users:any){
	// 	let userdata = JSON.stringify(users)
	// 	console.log(userdata);
	// 	return this.httpClient.post<any>(`${this.PHP_USER_SERVER}/user_reg.php`, userdata);
	// }


	generateResponse(prompt: string): Observable<string> {
		console.log(prompt)
		return this.httpClient.post<string>(this.apiUrl, { prompt });
	  }
}
