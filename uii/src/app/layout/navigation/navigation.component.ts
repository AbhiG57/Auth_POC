import { Component, Injector } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { IDynSrevice, isMockSharedService } from '../../core/config';
import { CommunicationService } from '../../core/services';
import { SocketService } from '../../core/services/socket.service';
import { AccessService } from '../../core/services/access.service';


@Component({
  selector: 'app-navigation',
  imports: [MenubarModule,AvatarModule, MenuModule, CommonModule, RippleModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  items: MenuItem[] | undefined;
  subItems: MenuItem[] | undefined;
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

