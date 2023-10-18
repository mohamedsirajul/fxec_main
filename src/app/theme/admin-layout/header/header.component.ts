import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import * as screenfull from 'screenfull';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class HeaderComponent implements OnInit,OnDestroy {
  @Input() showToggle = true;
  @Input() showBranding = true;
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();
  shopname: string;
  shopstatus: string;
  shop_status = false
  myDate: any;


  private get screenfull(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  constructor(public httpClient: HttpClient, private datePipe: DatePipe,public mediaObserver:MediaObserver) {}
 
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


  dateTime=Date.now();

  // startClock(){
  //   interval(1).subscribe(date=>{
  //     this.dateTime=Date.now();
  //   });
  // }

  ngOnInit() {

      this.myDate = new Date();
      this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      // this.shopname = this.apiservice.shop_name
      // this.subscription = this.refresh.subscribe(() => {

      // });
      // this.getshopstatusfirst();
    // else this.apiservice.userLogout()
  }



  toggleFullscreen() {
    if (this.screenfull.enabled) {
      this.screenfull.toggle();
    }
  }


  
}

