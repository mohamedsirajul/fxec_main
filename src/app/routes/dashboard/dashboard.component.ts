import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatapassService } from 'app/service/datapass.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment } from 'pdfmake'; // Import Alignment from pdfmake
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


interface DocumentDefinition {
  content: any[];
  styles: {
    [key: string]: {
      fontSize?: number;
      bold?: boolean;
      alignment?: Alignment;
      margin?: [number, number, number, number];
      decoration?: string;
      italics ?: any;
    };
  };
  images : any;
  defaultStyle?: {
    fontSize?: number;
    bold?: boolean;
    alignment?: Alignment;
    margin?: [number, number, number, number];
    pageOrientation?: string;
  };
  layout?: {
    fillColor?: (rowIndex: number, node: any) => string | null;
    hLineColor?: (rowIndex: number, node: any) => string;
    vLineColor?: (rowIndex: number, node: any) => string;
    hLineWidth?: (rowIndex: number, node: any) => number;
    vLineWidth?: (rowIndex: number, node: any) => number;
    pageSize?: string | [number, number];
  };
}


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
  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  options: string[] = [
    'Minutes of Department Meeting', 'Master list of documents', 'Subject Allocation', 'Requirement of Staff Members', 'Lab Manual', 'List of Experiments', 'Workload Allocation'
, 'Individual Time Table', 'Master Time Table', 'Coaching Class Time Table', 'Guest Lecture'
  ];

  file: File | null = null;

  imagePreview=""
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  rawFileArray = [];
  base64ImgArray = [];
  event_date: any;
  dateAdapter: any;
  today: Date;
  guestName : any
  Topic : any
  activityCode : any
  tempval: any;
  generateReport : any
  Organizer_dept : any
  StudCount : any;
  Organizer_fac_name : any
  guest_designation : any 
  choose_file_type : any;
  year : any;
  details: any;

  constructor(private http: HttpClient, private renderer: Renderer2, private openaiService: DatapassService,     
    private datePipe: DatePipe,
    ) {
      this.today = new Date();
     }

    getFormattedDate(date: Date): string {
      return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    }
    
  ngOnInit(): void {
    // Initialization code if needed
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.openaiService.getDetails().subscribe((result: any) => {
      this.details = result;
      console.log(this.details);

      //filtered opt start
      // for (let i = 0; i < this.details.length; i++) {
      //   this.temp_name = this.details[i].Name;
      // }

      // this.filteredOption_dept = this.my_Control_dept.valueChanges.pipe(
      //   startWith(''),
      //   map((value2) => this._filter_dept(value2))
      // );

      //tables name call
      // for (let i = 0; i < this.details.length; i++) {
      //   this.staffs.push(this.details[i].Name);
      // }

      // for (let i = 0; i < this.details.length; i++) {
      //   this.id.push(this.details[i].StaffID);
      // }

      // for (let i = 0; i < this.subdetails.length; i++) {
      //   if (this.reg.indexOf(this.subdetails[i].regulations) === -1) {
      //     this.reg.push(this.subdetails[i].regulations);
      //   }
      // }

    });

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  onSubmit(): void {



    this.tempval = {
      GeneratedReport: this.generateReport,
      Topic: this.Topic,
      EventDate: this.event_date,
      guestName: this.guestName,
      activityCode: this.activityCode,
      base64Img: this.base64ImgArray,
      StudCount: this.StudCount,
      Organizer_dept: this.Organizer_dept,
      guest_designation: this.guest_designation,
      Organizer_fac_name: this.Organizer_fac_name,
      choose_file_type : this.choose_file_type,
      year : this.year

    };
  
    console.log(this.tempval);
    
    // if (!this.file || !this.Organizer_dept || !this.Organizer_fac_name || !this.guestName || !this.Organizer_dept) {
    //   alert('Please fill in the title and select a file.');
    //   return;
    // }

    const formData = new FormData();
    formData.append('organizer_dept',this.Organizer_dept)
    formData.append('organizer_faculty',this.Organizer_fac_name)
    formData.append('guest_name',this.guestName)
    formData.append('guest_designation',this.guest_designation)
    formData.append('event_date',this.event_date)
    formData.append('topic',this.Topic)
    formData.append('year',this.year)
    formData.append('file_type',this.choose_file_type)
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

  EventDate(dateval: any) {
    this.event_date = this.datePipe.transform(dateval.value, 'yyyy/MM/dd');
  }
  
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

            console.log(this.base64ImgArray)
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


  generate_pdf(): void {

    this.tempval = {
      GeneratedReport: this.generateReport,
      Topic: this.Topic,
      EventDate: this.event_date,
      guestName: this.guestName,
      activityCode: this.activityCode,
      base64Img: this.base64ImgArray,
      StudCount: this.StudCount,
      Organizer_dept: this.Organizer_dept,
      guest_designation: this.guest_designation,
      Organizer_fac_name: this.Organizer_fac_name
    };
  
    localStorage.setItem('tempval', JSON.stringify(this.tempval));

    const storedData = localStorage.getItem('tempval');

if (storedData) {
  const tempval = JSON.parse(storedData);
  console.log(tempval);
  this.generateReport = tempval.GeneratedReport;
  this.Topic = tempval.Topic;
  this.event_date = tempval.EventDate;
  this.guestName = tempval.guestName;
  this.activityCode = tempval.activityCode;
  this.base64ImgArray = tempval.base64Img;
  this.StudCount = tempval.StudCount;
  this.Organizer_dept = tempval.Organizer_dept;
  this.guest_designation = tempval.guest_designation;
  this.Organizer_fac_name = tempval.Organizer_fac_name;
}
    console.log(this.tempval);
    
    const documentDefinition: DocumentDefinition = {
      content: [
        {
          image: 'logoo', 
          fit: [900, 135],
          margin: [0, -35],
        },
        { text: '', margin: [0, 16] },

        { text: this.Topic,  style: 'header', color: '#1A1110'  },

        { text: '', margin: [0, 5] },

        {
          columns: [
            { text: 'Guest Name:' + this.guestName, style: 'subheader', color: '#1A1110', fontSize: 12 , bold : true},
            {
              text: 'Date:' + this.event_date,
              style: 'subheader',
              width: '*',
              alignment: 'right',
              fontSize: 12,
              color: '#1A1110',
              bold: true,
              // margin: [0, 0, 80, 0], 
            },  
          ],
        },
        { text: '', margin: [0, 2] },
        { text: 'Activity Code:' + this.activityCode, style: 'subheader', color: '#1A1110', fontSize: 12 , bold : true},
        { text: '', margin: [0, 2] },

        // {
        //   image: '',
        //   width: 520,
        //   height: 200
        // },
      ],
      images: {
        logoo: {
          url: window.origin+'/assets/img/fxmain.png',
        }
      },
      styles: {
        mainheader: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
          decoration: 'underline'
        },
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
          italics: true,
        },
        paragraphStyle: {
          fontSize: 12,
          bold: false,
          alignment: 'left',
          margin: [0, 5, 0, 5]
        },
        boldText: {
          bold: true
        }
      },
    };
    // this.base64ImgArray.forEach((base64Img) => {
    //   documentDefinition.content.push({
    //     image: base64Img,
    //     width: 520,
    //     height: 250,
    //   })
    // });



    if (this.base64ImgArray.length > 0) {
      documentDefinition.content.push({
        image: this.base64ImgArray[0],
        width: 520,
        height: 250,
      });
    }
  
    documentDefinition.content.push({
      text: '',
      margin: [0, 5] 
    });


    // Add the text after the first image
    documentDefinition.content.push({
      text: this.generateReport,
      margin: [0, 2],
    });
  
    documentDefinition.content.push({
      text: '',
      margin: [0, 10] 
    });


    documentDefinition.content.push({
      text: "Today "+ this.StudCount +  " students are benefited from this course.",
      width: '*',
      alignment: 'center',
      fontSize: 12,
      color: '#1A1110',
      margin: [0, 2],
    });

    for (let i = 1; i < this.base64ImgArray.length; i++) {
      documentDefinition.content.push({
        image: this.base64ImgArray[i],
        width: 520,
        height: 250,
      });
    }




    documentDefinition.content.push({
      text: '',
      margin: [0, 10] 
    });

    documentDefinition.content.push({
      text: "HoD/"+this.Organizer_dept,
      width: '*',
      alignment: 'right',
      fontSize: 12,
      color: '#1A1110',
      margin: [0, 2],
    });
    
    // Create and open the PDF
    const pdfDoc = (pdfMake as any).createPdf(documentDefinition);
    pdfDoc.open();
  }









  



}
