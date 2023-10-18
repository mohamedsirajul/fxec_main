import { Component, Input } from '@angular/core';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {

  @Input() ripple = false;

  // menus = this.menuService.getAll();

  menus = [
      {
        icon: "business",
        name: "Sales",
        state: "sales",
        type: "link",
      },
      {
        icon: "dashboard",
        name: "Dashboard",
        state: "dashboard",
        type: "link",
      },
      {
        icon: "restaurant_menu",
        name: "Menu",
        state: "menu",
        type: "link",
      },
      {
        icon: "report",
        name: "Reports",
        state: "reports",
        type: "sub",
        children: [
          {
            name: "Sales Report",
            state: "sales_report",
            type: "link",
          },
          {
            name: "Product Report",
            state: "product_report",
            type: "link",
          },
        ],
      },
      {
        icon: "settings",
        name: "Settings",
        state: "settings",
        type: "link",
      },    
  ]

  
  userRoles = [];

  constructor(private apiservice:ApiService) {
    console.log(this.menus)
  }

  // Delete empty values and rebuild route
  buildRoute(states: string[]) {
    // console.log(this.menus)
    let route = '';
    states.forEach(item => {
      if (item && item.trim()) {
        route += '/' + item.replace(/^\/+|\/+$/g, '');
      }
    });
    return route;
  }

  hasAccess(item): boolean {
    if("2" == '2')
    {
      this.userRoles = ["admin","manager","user"]
    }
    else if("1" == '1')
    {
      this.userRoles = ["manager","user"]
    }
    // this.apiservice.role
    else if("0" == '0')
    {
      this.userRoles = ["user"]
    }
    // console.log(item.roles)
    // check if user has required roles to access menu item
    if (item.roles.length == 0) {
      // item doesn't require any role, allow access
      return true;
    } else {
      // check if user has any of the required roles
      // return false
      return item.roles.some(role => this.userRoles.includes(role));
    }
  }

}
