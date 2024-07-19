import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment } from 'pdfmake'; // Import Alignment from pdfmake
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import { DatapassService } from 'app/service/datapass.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

// Define the custom type for the document definition
interface DocumentDefinition {
  content: any[];
  styles: {
    [key: string]: {
      fontSize?: number;
      bold?: boolean;
      alignment?: Alignment;
      margin?: [number, number, number, number];
    };
  };
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

interface Dept {
  dept: string;
}
interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-acadamic-schedule',
  templateUrl: './acadamic-schedule.component.html',
  styleUrls: ['./acadamic-schedule.component.scss'],
  providers: [DatePipe],
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
export class AcadamicScheduleComponent implements OnInit {



  report_arr: any[] = [];
  products_arr: any[] = [];
  data_arr: any[] = [];
  joinedData: any[] = [];
  start_date: any;
  end_date: any;
  tempval: any;
  today: Date;
  dataSource: any;
  organizer_dept : any;
  choose_file_type:any;
  organizer_faculty:any;
  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;
  options: string[] = [
    'Minutes of Department Meeting', 'Master list of documents', 'Subject Allocation', 'Requirement of Staff Members', 'Lab Manual', 'List of Experiments', 'Workload Allocation'
, 'Individual Time Table', 'Master Time Table', 'Coaching Class Time Table', 'Guest Lecture'
  ];
  depts: Dept[] = [
    {dept: 'CSBS'},
    {dept: 'CSE'},
    {dept: 'AIDS'},
    {dept: 'IT'},
    {dept: 'MECH'},

  ];

  // foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'},
  // ];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  salesdata: any[] = [];
  displayedColumns: string[] = ['guest_name', 'topic', 'year', 'guest_designation', 'organizer_dept', 'organizer_faculty', 'filename', 'file_type', 'createdat' , 'download'];
  printColumns: string[] = ['bill_id', 'product_id', 'product_name', 'product_units', 'product_price', 'product_quantity', 'product_amount', 'product_total', 'date', 'time'];
  head = [['bill_id', 'product_id', 'product_name', 'product_units', 'product_price', 'product_quantity', 'product_amount', 'product_total', 'date', 'time']];
  ex_head = ['bill_id', 'product_id', 'product_name', 'product_units', 'product_price', 'product_quantity', 'product_amount', 'product_total', 'date', 'time'];
  row_width = ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'];
  stats = [
    {
      title: 'Total files uploaded',
      amount: '0',
      color: 'bg-purple-500',
    },
    {
      title: 'Organizer Dept',
      amount: '',
      color: 'bg-purple-500',
    },
    {
      title: 'File Type',
      amount: '',
      color: 'bg-purple-500',
    },

    // {
    //   title: 'Balance (₹)',
    //   amount: '0',
    //   color: 'bg-purple-500',
    // }
  ];
  tot_prod: any;
  toTalamounts: any;

  constructor(
    private detailss: DatapassService,
    private datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>,
    private toastr: ToastrService
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.today = new Date();
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  downloadFileClicked(fileData: string, fileName: string) {
    this.downloadFile(fileData, fileName);
  }
  downloadFile(fileData: string, fileName: string) {
    const byteCharacters = atob(fileData); // Decode the base64 data
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' }); // You may need to set the correct MIME type
  
    // Use the FileSaver library to save the blob as a file
    saveAs(blob, fileName);
  }
  

  getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  getResults() {



    this.salesdata = [];
    if (this.start_date != null && this.end_date != null) {
      const startDate = new Date(this.start_date);
      const endDate = new Date(this.end_date);

      if (startDate > endDate) {
        const toastConfig: Partial<IndividualConfig> = {
          timeOut: 2000,
          closeButton: true,         
           progressBar: true,
          progressAnimation: 'decreasing'
        };
        this.toastr.error('Start date cannot be larger than end date.', 'Error', toastConfig);
      } else {
        this.dataSource = new MatTableDataSource();

        this.tempval = {
          startDate: this.start_date,
          endDate: this.end_date,
          organizer_dept : this.organizer_dept,
          organizer_faculty : this.organizer_faculty,
          choose_file_type : this.choose_file_type
        };
        console.log(this.tempval)

        this.detailss.get_sales_result(this.tempval).subscribe(
          (data: any) => {
            console.log(data)
            // if (data != null) {
              this.joinedData = data;

              console.log(this.joinedData)
              for (let i = 0; i < this.joinedData.length; i++) {

                const reportLength = this.joinedData.length;
                console.log(reportLength);

                const fileData = this.joinedData[0].file_data;

                console.log(fileData)


        

                // const salesItem = {
                //   year : this.joinedData[i].year,
                //   topic : this.joinedData[i].year,
                //   organizer_faculty : this.joinedData[i].year,
                //   id: this.joinedData[i].year
                //   guest_name: this.joinedData[i].year
                //   guest_designation: this.joinedData[i].year
                //   file_type:this.joinedData[i].year
                //   file_name:this.joinedData[i].year
                //   event_date:this.joinedData[i].year
                //   created_at:this.joinedData[i].year
                //   organizer_dept:this.joinedData[i].year
                // };
                // // this.getTotalProdIdsLength(products);

                // console.log(this.tot_prod);
                

                // this.salesdata.push(salesItem);
            
              }
              this.salesdata = this.joinedData
              this.dataSource.data = this.joinedData;
              this.dataSource.paginator = this.paginator;
              console.log(this.dataSource.data)
              this.stats[0].amount = this.dataSource.data.length;
              this.stats[1].amount = 'CSBS';
              this.stats[2].amount = 'Guest lecture';
          
          },
          (error: any) => {
            console.log(error);
            if (error && error.error && error.error.message) {
              const toastConfig: Partial<IndividualConfig> = {
                timeOut: 1500,
                closeButton: true,
                progressBar: true,
                progressAnimation: 'decreasing'
              };
              this.toastr.error(error.error.message, 'Error', toastConfig);
              console.log('Error message:', error.error.message);
            }
          }
        );
      }
    } else {
      const toastConfig: Partial<IndividualConfig> = {
        timeOut: 1500,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing'
      };
      this.toastr.error('Kindly Enter the Date', 'Error', toastConfig);
    }
  }

  getProductprod_id(products: any[]): string {

    return products.map(product => product.prod_id).join(', ');
  }
  // getTotalProdIdsLength(products: any[]): number {
  //   const prodIds = products.map(product => product.prod_id).join(', ').length;
  //   // const totalLength = prodIds.join('').length;
  //   console.log(prodIds);
  //   return prodIds;
  // }
  
  getProductNames(products: any[]): string {
    return products.map(product => product.prod_name).join(', ');
  }

  getProductunits(products: any[]): string {
    return products.map(product => product.units).join(', ');
  }

  getProductprice(products: any[]): string {
    return products.map(product => product.price).join(', ');
  }

  getProductquantity(products: any[]): string {
    return products.map(product => product.quantity).join(', ');
  }

  getProductamount(products: any[]): string {
    return products.map(product => product.amount).join(', ');
  }

  StartDateEvent(dateval: any) {
    this.start_date = this.datePipe.transform(dateval.value, 'yyyy/MM/dd');
  }

  EndDateEvent(dateval: any) {
    this.end_date = this.datePipe.transform(dateval.value, 'yyyy/MM/dd');
  }

  tablename = '';
  fulltablename = 'Sales Report';

  exportpdf() {
    if (this.salesdata.length !== 0) {
      const data = this.dataSource.data;
      const documentDefinition: DocumentDefinition = {
        content: [
          { text: 'Report Manager', style: 'mainheader' },
          { text: 'From: ' + this.start_date + ' To: ' + this.end_date, style: 'subheader' },
          {
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
              body: [
                this.printColumns.map(column => column.replace('_', ' ')),
                ...(data as any[]).map((item: any) => [
                  item.bill_id,
                  item.product_id,
                  item.product_name,
                  item.product_units,
                  item.product_price,
                  item.product_quantity,
                  item.product_amount,
                  item.product_total,
                  item.date,
                  item.time
                ])
              ]
            }
          }
        ],
        styles: {
          mainheader: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10]
          },
          header: {
            fontSize: 16,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5]
          }
        },
        defaultStyle: {
          fontSize: 12,
          bold: false,
          alignment: 'left',
          margin: [0, 0, 0, 0]
        },
        layout: {
          pageSize: [792, 612],
          fillColor: function (i: number, node: any) {
            return i === 0 ? '#CCCCCC' : null;
          },
          hLineColor: function (i: number, node: any) {
            return i === 0 ? '#000000' : '#DDDDDD';
          },
          vLineColor: function (i: number, node: any) {
            return i === 0 ? '#000000' : '#DDDDDD';
          },
          hLineWidth: function (i: number, node: any) {
            return i === 0 ? 1 : 0.5;
          },
          vLineWidth: function (i: number, node: any) {
            return i === 0 ? 1 : 0.5;
          }
        }
      };
      
      pdfMake.createPdf(documentDefinition).open();
      
    } else {
      // alert('No Data');
      const toastConfig: Partial<IndividualConfig> = {
        timeOut: 1500,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing'
      };
      this.toastr.error('No Data', 'Error', toastConfig);
    }
  }
  
  

  exportcsv() {
    if (this.salesdata.length !== 0) {
      const data = this.dataSource.data;
      const title = 'Siraj Hotel Sales Report';
      const header = this.ex_head;
      const header1 = this.printColumns;
      console.log(header1);
      
      const arr = [];
  
      for (let i = 0; i < data.length; i++) {
        const newarr = [];
        for (let j = 0; j < header1.length; j++) {
          newarr.push(data[i][header1[j]]);

        }
        arr.push(newarr);
      }
      console.log(arr);
      
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sales Report');
  
      const titleRow = worksheet.addRow([title]);
      titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
  
      worksheet.addRow([]);
      worksheet.mergeCells('A1:D2');
      worksheet.addRow([]);
  
      const headerRow = worksheet.addRow(header);
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF00' },
          bgColor: { argb: '9F4020BF' }
        };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });
  
      arr.forEach(d => {
        const row = worksheet.addRow(d);
      });
  
      worksheet.getColumn(3).width = 30;
      worksheet.getColumn(4).width = 30;
      worksheet.addRow([]);
  
      const footerRow = worksheet.addRow(['This is a Siraj Hotel Sales Report Excel sheet.']);
      footerRow.getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFCCFFE5' }
      };
      footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
  
      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'Sales_Report.xlsx');
      });
    } else {
      // alert('No Data');
      const toastConfig: Partial<IndividualConfig> = {
        timeOut: 1500,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing'
      };
      this.toastr.error('No Data', 'Error', toastConfig);
    }
  }
}
