import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatapassService } from 'app/service/datapass.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('chatContainer') private chatContainerRef!: ElementRef;
  @ViewChild('inputBox') private inputBoxRef!: ElementRef;
  messages: any[] = [];
  message: string = '';
  generatedResponse: { response: string } | null = null;
  finalresponse: any;



  imagePreview=""
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  rawFileArray = [];
  base64ImgArray = [];



  constructor(private http: HttpClient, private renderer: Renderer2, private openaiService: DatapassService) { }

  ngOnInit(): void {
    // Initialization code if needed
  }
  // fileToUpload: any;
  // imageUrl: any;
  // handleFileInput(file: FileList) {
  //   this.fileToUpload = file.item(0);

  //   //Show image preview
  //   let reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imageUrl = event.target.result;
  //   }
  //   reader.readAsDataURL(this.fileToUpload);
  // }


  
  sendMessage(): void {
    if (this.message.trim() === '') {
      return;
    }

    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const body = { message: this.message };

    this.messages.push({ sender: 'user', content: this.message });

    // this.http.post<any>('http://127.0.0.1:5000/chat', body, { headers }).subscribe(
    //   (data) => {
        
    //     this.messages.push({ sender: 'bot', content: data.response });
    //     setTimeout(() => {
    //       this.scrollToBottom();
    //     });
    //   },
    //   (error) => {
    //     console.error(error);
    //     this.messages.push({ sender: 'bot', content: 'Error occurred. Please try again later.' });
    //     setTimeout(() => {
    //       this.scrollToBottom();
    //     });
    //   }
    // );

    this.openaiService.generateResponse(this.message).subscribe(
      (response: { response: string } | string) => {
        if (typeof response === 'string') {
          this.generatedResponse = { response };
          console.log(this.generatedResponse)
          this.finalresponse  = this.generatedResponse.response.replace(/\n/g, '<br>');

          this.messages.push({ sender: 'bot', content: this.finalresponse });
          console.log(this.messages)
          setTimeout(() => {
            this.scrollToBottom();
          });      
        } else {
          this.generatedResponse = response as { response: string };
          console.log(this.generatedResponse)
          this.finalresponse  = this.generatedResponse.response.replace(/\n/g, '<br>');
          this.messages.push({ sender: 'bot', content: this.finalresponse });
          console.log(this.messages)
          setTimeout(() => {
            this.scrollToBottom();
          });  
        }
        console.log(this.generatedResponse);
        console.log(response);

      },
      (error) => {
        console.error('Error generating response:', error);
      }
    );
    this.message = '';

  }

  scrollToBottom(): void {
    const chatContainer = this.chatContainerRef.nativeElement;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  sanitize(): string {
    if (this.generatedResponse && this.generatedResponse.response) {
      return this.generatedResponse.response.replace(/\n/g, '<br>');
    } else {
      return '';
    }
  }



  onImagePicked(fileInput) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0] && this.rawFileArray.indexOf(fileInput.target.files[0])==-1) {
      // Size Filter Bytes
      this.rawFileArray.push(fileInput.target.files[0]);
      console.log(this.rawFileArray)
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }



      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            console.log(imgBase64Path)
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            this.base64ImgArray.push(imgBase64Path);

            // console.log(this.base64ImgArray)
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
    // console.log(this.rawFileArray)
  }
  removeImage(index){
    this.rawFileArray.splice(index,1);
    this.base64ImgArray.splice(index,1)
  }

}
