import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'app-user',
  template: `
    <button
      mat-button
      class="matero-toolbar-button matero-avatar-button"
      href="javascript:void(0)"
      [matMenuTriggerFor]="menu"
    >
      <svg class="matero-avatar" width="32" alt="avatar" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

    </button>

    <mat-menu #menu="matMenu">
      <a routerLink="/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </a> 
      <a (click)="logout()" mat-menu-item>
        <mat-icon>exit_to_app</mat-icon>
        <span>Logout</span>
      </a>
    </mat-menu>
  `,
})

export class UserComponent implements OnInit{
  username:String;
  imageurl:String;
  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    // if(this.apiservice.shop_name != null)
    // {
      // this.username = this.apiservice.username
      // this.imageurl = this.apiservice.shop_logo
    // }
    // else this.apiservice.userLogout()
  }
  
  logout() {
    // this.apiservice.userLogout()
  }

}
