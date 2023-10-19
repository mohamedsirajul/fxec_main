import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second-year',
  templateUrl: './second-year.component.html',
  styleUrls: ['./second-year.component.scss']
})
export class SecondYearComponent implements OnInit {

  title: string = '';
  surname : any;
  file: File | null = null;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  onSubmit(): void {
    if (!this.title || !this.file || !this.surname) {
      alert('Please fill in the title and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('surname',this.surname)
    formData.append('file', this.file);

    this.http.post('https://zenanvibe.com/report_manager/upload.php', formData).subscribe(
      (response) => {
        console.log('Upload successful:', response);
      },
      (error) => {
        console.error('Upload failed:', error);
        // Handle error here
      }
    );
  }

}
