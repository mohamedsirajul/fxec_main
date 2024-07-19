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

	  uploadFile(file: File) {
		console.log(file)
		return this.httpClient.post<any>('https://zenanvibe.com/report_manager/upload.php', file);
	  }

	  get_sales_result(sales_dates:any){
		let salesresult = JSON.stringify(sales_dates)
		console.log(salesresult);
		return this.httpClient.post<any>(`https://zenanvibe.com/report_manager/retrieve.php`, salesresult);
	}

	baseUrl: string = 'https://zenanvibe.com/siraji_ttable_generator'
	getDetails(){
	  return this.httpClient.get<any>(this.baseUrl+'/get_staffs_data.php')
	}
}
