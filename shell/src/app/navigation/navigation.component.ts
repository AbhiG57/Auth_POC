import { Component, Injector } from '@angular/core';
import { IDynSrevice, isMockSharedService } from '../core/config';
import { AccessService } from '../core/services/access.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  items: any[] | undefined;
  subItems: any[] | undefined;
  service: IDynSrevice['service'];
  user:any;
  constructor(private accessService:AccessService, private injector: Injector){
        this.service = this.injector.get<IDynSrevice['service']>(isMockSharedService)
    }

  ngOnInit() {
      console.log("Navigation component");
      
      this.user = this.accessService.getUserInfo();
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-home',
              routerLink:'home'
          },
          {
            label: 'Resturants',
            icon: 'pi pi-home',
            routerLink:'restaurants'
          },
          {
            label: 'Flights',
            icon: 'pi pi-home',
            routerLink:'flights/flights-search'
          }


      ];
      this.subItems = [
        {
            separator: true
        },
        {
            label: 'Profile',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    shortcut: '⌘+O'
                },
                {
                    label: 'Messages',
                    icon: 'pi pi-inbox',
                    badge: '2'
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    shortcut: '⌘+Q',
                    command: () => {
                      this.logoutUser();
                  }
                }
            ]
        },
        {
            separator: true
        }
    ];
  }

  logoutUser():void
  {
    window.location.href=`${window.location.origin}/logout`
  }
}
