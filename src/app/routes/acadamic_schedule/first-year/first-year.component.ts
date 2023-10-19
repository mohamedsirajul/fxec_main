import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DatapassService } from 'app/service/datapass.service';

@Component({
  selector: 'app-first-year',
  templateUrl: './first-year.component.html',
  styleUrls: ['./first-year.component.scss']
})
export class FirstYearComponent {
  title: string = '';
  selectedFile: any;
  uploadSuccess: boolean;

  // uploadResponse: any = null;
  // selectedFile: File | null = null;

  constructor(private fileUploadService: DatapassService,
    private http: HttpClient,
    ) { }

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  upload(files: File[]){
 
    console.log(files)
    this.uploadAndProgress(files);

    this.selectedFile = files[0]
    
    // this.fileUploadService.uploadFile(this.title, this.selectedFile).subscribe(
    //   response => {
    //     console.log(response);
    //     // Handle the response from the server here
    //   },
    //   error => {
    //     console.error(error);
    //     // Handle the error here
    //   }
    // );
  }


  onUpload(){    
    console.log(this.selectedFile)
    this.fileUploadService.uploadFile(this.selectedFile).subscribe(
      response => {
        console.log(response);
        // Handle the response from the server here
      },
      error => {
        console.error(error);
        // Handle the error here
      }
    );
  }


  uploadAndProgress(files: File[]){
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    
    this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }

}
